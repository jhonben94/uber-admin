import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  exito( titulo,texto){
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'success',
      confirmButtonText: 'Cerrar'
    })
  }
  error(titulo,texto){
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'error',
      confirmButtonText: 'Cerrar'
    })

  }
  advertencia(titulo,texto){
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      confirmButtonText: 'Cerrar'
    })
  }
  info(titulo,texto){
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'info',
      confirmButtonText: 'Cerrar'
    })
  }
  pregunta(titulo,texto){
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'question',
      confirmButtonText: 'Cerrar'
    })
  }
}
