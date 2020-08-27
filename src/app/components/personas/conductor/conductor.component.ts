import { Component, OnInit, Input, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { ConductoresService, MensajesService, TipoDocumentoService } from '../../../services/service.index';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of } from 'rxjs';
import { startWith, switchMap, catchError,map } from 'rxjs/operators';
import { deleteEmptyData, CANTIDAD_PAG_LIST, CANTIDAD_PAG_DEFAULT } from '../../commons/app-util';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.scss']
})
export class ConductorComponent implements OnInit {

 /**
  * @type {number}
  * @description Cantidad total de registros obtenidos para la grilla.
 */
resultsLength = 0;

/**
 * @type {boolean}
 * @description Flag utilizado para confirmar verificar el estado de la peticion de la grilla
*/
isLoadingResults = true;

/**
 * @type {boolean}
*/
isRateLimitReached = false;

filtrosForm: any;

data: any[] = [];

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;
@BlockUI() blockUI: NgBlockUI;

  listaActivo: any[] = [
    {
      valor:true,
      descripcion:'Si'
    },
    {
      valor:false,
      descripcion:'No'
    }
  ];

  listaSexo: any[] = [
    {
      valor:'M',
      descripcion:'Masculino'
    },
    {
      valor:'F',
      descripcion:'Femenino'
    }
  ];
  displayedColumns: string[] = ['number','nombres','apellidos','username','documento','idTipoDocumento','sexo','telefono','email','accion'];
  opcionPagina = CANTIDAD_PAG_LIST

  listaColumnas: any = [
          {
            matDef:'apellidos',
            label:'apellidos',
            descripcion:'APELLIDOS'
          },

        {
          matDef:'nombres',
          label:'nombres',
          descripcion:'NOMBRE'
        },
        {
          matDef:'username',
          label:'username',
          descripcion:'USERNAME',
          relacion: false,
          columnaRelacion:''
        },
        {
          matDef:'email',
          label:'email',
          descripcion:'CORREO',
          relacion: false,
          columnaRelacion:''
        },
        {
          matDef:'idTipoDocumento',
          label:'idTipoDocumento',
          descripcion:'TIPO DOCUMENTO',
          relacion: true,
          columnaRelacion:'nombre'
        },
        {
          matDef:'documento',
          label:'documento',
          descripcion:'DOCUMENTO',
          relacion: false,
          columnaRelacion:''
        },
        {
          matDef:'telefono',
          label:'telefono',
          descripcion:'TELÉFONO',
          relacion: false,
          columnaRelacion:''
        },
        {
          matDef:'activo',
          label:'activo',
          descripcion:'ACTIVO',
          relacion: false,
          columnaRelacion:'',
          estados:['SI','NO']
        },
        
 ];
  listaTipoDocumento: []=[];


  constructor(
    private mensaje : MensajesService,
    private service: ConductoresService,
    private fb : FormBuilder,
    private tipoDocumentoService: TipoDocumentoService
  ) { 


    this.filtrosForm = this.fb.group({
      nombres: [''],
      apellidos: [''],
      documento:[''],
      idTipoDocuemnto:[null],
      sexo:[null],
      activo:[null],
      usuario:[''],
      telefono:['']
    });
  }

  ngOnInit() {
    this.paginator.pageSize=CANTIDAD_PAG_DEFAULT;
    this.blockUI.start()
    this.tipoDocumentoService.listarRecurso().subscribe( (res:any) =>{
      this.blockUI.stop()
      this.listaTipoDocumento = res.dato;

    }, err=> this.blockUI.stop());

  }
  ngAfterViewInit() {
   // If the user changes the sort order, reset back to the first page.
   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
   this.buscar();
   }

  buscar(){
 
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
         this.blockUI.start();
          this.isLoadingResults = true;
          const params ={
            cantidad: this.paginator.pageSize,
            pagina: this.paginator.pageIndex,
            orderBy: this.sort.active,
            orderDir: this.sort.direction.toUpperCase(),
            filtros: deleteEmptyData( this.filtrosForm.value)
          }
          
          return this.service.listarPaginadoRecurso(params);
        }),
        map((data: any) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total;
         // this.expanded = false;
         this.blockUI.stop();
          return data.lista;
          
        }),
        catchError(() => {
          this.blockUI.stop();
          this.isLoadingResults = false;
          // Catch if the API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe(data => this.data = data);
  }

  limpiar(){


    this.filtrosForm.reset()
    this.paginator.pageIndex=0
    this.buscar()
  }

  acciones(data,e){
    
    const actionType = e.target.getAttribute('data-action-type');

    this.mensaje.exito('Confirmacion','Operacion exitosa.')
  }


  mostrarCampo(row,columna){
    
    if(columna.relacion){
      console.log(row);
      
      if(row[columna.label] == null) return '';
      return row[columna.label][columna.columnaRelacion]
    }else{
      if (typeof columna.estados != 'undefined') {
          const label = row[columna.label]?columna.estados[0]:columna.estados[1]
          return label;
      }
      return row[columna.label]
    }
  }
  agregar(){

  }

}
