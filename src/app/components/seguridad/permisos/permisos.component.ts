import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CANTIDAD_PAG_LIST, CANTIDAD_PAG_DEFAULT, deleteEmptyData, MENSAJES_DIALOG } from '../../commons/app-util';
import { MensajesService,PermisoService } from '../../../services/service.index';
import { FormBuilder, Validators } from '@angular/forms';
import { merge, of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { PopUpGenericoService } from 'src/app/services/shared/pop-up-generico.service';
import { PermisosEditComponent } from './permisos-edit.component';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss']
})
export class PermisosComponent implements OnInit {
 
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
      valor:'S',
      descripcion:'Si'
    },
    {
      valor:'N',
      descripcion:'No'
    }
  ];
  displayedColumns: string[] = ['number','nombre','descripcion','activo','accion'];
  opcionPagina = CANTIDAD_PAG_LIST

  listaColumnas: any = [
        
        {
          matDef:'nombre',
          label:'nombre',
          descripcion:'NOMBRE',
          relacion: false,
          columnaRelacion:''
        },
        {
          matDef:'descripcion',
          label:'descripcion',
          descripcion:'DESCRIPCIÓN',
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


  constructor(
    private popUpService: PopUpGenericoService,
    private mensaje : MensajesService,
    private service: PermisoService,
    private fb : FormBuilder
  ) { 


    this.filtrosForm = this.fb.group({
      nombre: [''],
      descripcion:[''],
      activo: [],
      idPermiso:['']
    });
  }

  ngOnInit() {
    this.paginator.pageSize=CANTIDAD_PAG_DEFAULT;

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
    console.log(e);
    const actionType = e;    
    switch (actionType) {
      case 'activar':
        Swal.fire({
          title: 'ACTIVAR',
          text:  MENSAJES_DIALOG.ACTIVAR + ' el permiso: ' + data.nombre +' ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.value) {

            this.blockUI.start()
            this.service.activarRecurso(data.idPermiso).subscribe( (r:any) =>{
             
              if(r.exitoso){
                this.mensaje.exito('Éxito',r.mensaje + ' ' +data.nombre+'.' )
                this.buscar();
              }
              this.blockUI.stop()
            },(err)=>{
             this.mensaje.error('Conflicto',err.error.mensaje);
             this.blockUI.stop()
            });

      
          }
        })
        break;
      case 'desactivar':
        Swal.fire({
          title: 'DESACTIVAR',
          text:  MENSAJES_DIALOG.DESACTIVAR + ' el permiso: ' + data.nombre +' ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.value) {

            this.blockUI.start()
            this.service.desactivarRecurso(data.idPermiso).subscribe( (r:any) =>{
             
              if(r.exitoso){
                this.mensaje.exito('Éxito',r.mensaje + ' ' +data.nombre+'.' )
                this.buscar();
              }
              this.blockUI.stop()
            },(err)=>{
             this.mensaje.error('Conflicto',err.error.mensaje);
             this.blockUI.stop()
            });

      
          }
        })
      break;

      case 'editar':

        this.popUpService.confirm('Modificar Permiso', '',
        'Aceptar', 'Cancelar','sm',data,PermisosEditComponent).then((dataResult:any)=>
        {
          if(dataResult){
           this.blockUI.start()
           this.service.modificarRecurso( dataResult,data.idPermiso).subscribe( (r:any) =>{
            
             if(r.exitoso){
               this.mensaje.exito('Éxito',r.mensaje + ' ' +data.nombre+'.' )
               this.buscar();
             }
             this.blockUI.stop()
           },(err)=>{
            this.mensaje.error('Conflicto',err.error.mensaje);
            this.blockUI.stop()
           });
          }
       
        }) 
      
        break;
    
      default:
        break;
    }

  }


  mostrarCampo(row,columna){
    
    if(columna.relacion){
      if(row[columna.label] == null) return '';
      return row[columna.label][columna.columnaRelacion]
    }else{
      if (typeof columna.estados != 'undefined') {
          const label = row[columna.label]=='S'?columna.estados[0]:columna.estados[1]
          return label;
      }
      return row[columna.label]
    }
  }

  agregar(){
    this.popUpService.confirm('Agregar Permiso', '',
    'Aceptar', 'Cancelar','sm',null,PermisosEditComponent).then((dataResult:any)=>
    {
      if(dataResult){
       dataResult.activo='S';
       this.blockUI.start()
       this.service.agregarRecurso( dataResult).subscribe( (r:any) =>{
        
         if(r.exitoso){
           this.mensaje.exito('Éxito',r.mensaje)
           this.buscar();
         }
         this.blockUI.stop()
       },(err)=>{
        this.mensaje.error('Conflicto',err.error.mensaje);
        this.blockUI.stop()
       });
      }
   
    }) 
  }
  validarAcciones(row){
    return row.activo =='S'
  }

}
