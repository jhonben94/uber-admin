import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  recurosBaseURL: string=environment.URL_BASE + '/marcas/';
  constructor(private http: HttpClient) { }
  
  activarRecurso(id){
    return this.http.put(this.recurosBaseURL+id+'/activar',{}).pipe(
      map(r => r)
    );
  }

  desactivarRecurso(id){
    return this.http.put(this.recurosBaseURL+id+'/desactivar',{}).pipe(
      map(r => r)
    );
  }

  agregarRecurso(recurso){
    return this.http.post(this.recurosBaseURL, recurso).pipe(
      map(r => r)
    );
  }
  modificarRecurso(recurso,id){
    return this.http.put(this.recurosBaseURL+id, recurso).pipe(
      map(r => r)
    );
  }
  eliminarRecurso(id){
    return this.http.delete(this.recurosBaseURL + id).pipe(
      map(r => r)
    );
  }
  obtenerRecurso(id){
    return this.http.get(this.recurosBaseURL+id, ).pipe(
      map(r => r)
    );

  }
  listarRecurso(){
    return this.http.get(this.recurosBaseURL).pipe(
      map(r => r)
    );
  }

  listarPaginadoRecurso(filtros){

    return this.http.post(this.recurosBaseURL+'paginado', filtros).pipe(
      map(r => r)
    );
  }
}
