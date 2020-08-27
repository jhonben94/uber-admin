import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class PopUpGenericoService {

  constructor(private modalService: NgbModal) { }
  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'Confirmar',
    btnCancelText: string = 'Cancelar',
    dialogSize: 'sm'|'lg' = 'sm', 
    data?: any,
    component?: any): Promise<boolean> {
    const modalRef = this.modalService.open(component, { size: dialogSize, centered: true,
      windowClass: 'fade'});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.data = data;
    return modalRef.result;
  }
}

