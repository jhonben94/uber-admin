import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { deleteEmptyData } from '../../commons/app-util';

@Component({
  selector: 'app-tipo-documento-edit',
  templateUrl: './tipo-documento-edit.component.html',
  styleUrls: ['./tipo-documento-edit.component.scss']
})
export class TipoDocumentoEditComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Input() data: any;
  form = this.fb.group({
    nombre:['',Validators.required],
    descripcion: [''],
  });
  @BlockUI() blockUI: NgBlockUI;

  constructor(private activeModal: NgbActiveModal, 
    private fb: FormBuilder,
    config: NgbModalConfig) {

   
      this.form = this.fb.group({
        codigo: ['',Validators.required],
        nombre:[''],
      });
    config.backdrop = 'static';
    config.keyboard = false;
    
   }

  ngOnInit() {
    if(typeof this.data != 'undefined' && this.data != null){
        this.blockUI.start()
          this.form.controls.codigo.setValue(this.data.codigo);
          this.form.controls.nombre.setValue(this.data.nombre);
          this.form.controls.codigo.disable()
          this.blockUI.stop()
    }
    
  }

  public decline() {
    this.activeModal.close();
  }

  public accept() {
    this.form.controls.codigo.enable();
    this.activeModal.close(deleteEmptyData(this.form.value));
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
