import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { deleteEmptyData } from '../../commons/app-util';
import { MarcasService } from 'src/app/services/service.index';

@Component({
  selector: 'app-modelo-edit',
  templateUrl: './modelo-edit.component.html',
  styleUrls: ['./modelo-edit.component.scss']
})
export class ModeloEditComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Input() data: any;
  form = this.fb.group({
    nombre:['',Validators.required],
    descripcion: [''],
  });
  listaRelacion:[]=[]
  @BlockUI() blockUI: NgBlockUI;

  constructor(private activeModal: NgbActiveModal, 
    private relacionService: MarcasService,
    private fb: FormBuilder,
    config: NgbModalConfig) {

   
      this.form = this.fb.group({
        nombre: ['',Validators.required],
        idMarca:[null,Validators.required],
        descripcion:[''],
      });
    config.backdrop = 'static';
    config.keyboard = false;
    
   }

  ngOnInit() {
    this.blockUI.start()
    this.relacionService.listarRecurso().subscribe( (res:any)=>{
      this.listaRelacion=res.dato;
      if(typeof this.data != 'undefined' && this.data != null){
          this.form.controls.nombre.setValue(this.data.nombre);
          this.form.controls.descripcion.setValue(this.data.descripcion);
          this.form.controls.idMarca.setValue(this.data.idMarca.idMarca);
          this.form.controls.nombre.disable()
         
      }
      this.blockUI.stop()
    },
    errs =>  this.blockUI.stop());
 
    
  }

  public decline() {
    this.activeModal.close();
  }

  public accept() {
    this.form.controls.nombre.enable();
    const valor  = this.form.value;
    const data = {
      nombre: valor.nombre,
      descripcion: valor.descripcion,
      idMarca:{
        idMarca: valor.idMarca
      }
    }
    this.activeModal.close(data);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
