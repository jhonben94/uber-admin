import { Component, OnInit } from '@angular/core';
import { TipoDocumentoService, ConductoresService } from '../../../services/service.index';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-conductor-edit',
  templateUrl: './conductor-edit.component.html',
  styleUrls: ['./conductor-edit.component.scss']
})
export class ConductorEditComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  listaTipoDocumento: []=[];

  form = this.fb.group({
    nombres: ['',Validators.required],
    apellidos: ['',Validators.required],
    documento:['',Validators.required],
    idTipoDocumento:[null,Validators.required],
    sexo:[null,Validators.required],
    activo:[null,Validators.required],
    usuario:['',Validators.required],
    telefono:['',Validators.required]
  });



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

  constructor(   
    private service: ConductoresService, 
    private tipoDocumentoService: TipoDocumentoService,
    private fb : FormBuilder,
    ) { 

      this.form = this.fb.group({
        nombres: ['',Validators.required],
        apellidos: ['',Validators.required],
        documento:['',Validators.required],
        idTipoDocumento:[null,Validators.required],
        sexo:[null,Validators.required],
        activo:[null,Validators.required],
        usuario:['',Validators.required],
        telefono:['',Validators.required]
      });

    }


  ngOnInit(): void {
    
    this.tipoDocumentoService.listarRecurso().subscribe( (res:any) =>{
      this.blockUI.stop()
      this.listaTipoDocumento = res.dato;

    }, err=> this.blockUI.stop());

  }

  guardar(){
    console.log(this.form.value);
    let data = this.form.value;
    this.blockUI.start()
    this.service.agregarRecurso(data).subscribe( respuesta  => {
      console.log(respuesta);
      
      this.blockUI.stop()
    }, err =>{

      this.blockUI.stop()
    });
  }

}
