import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  recurosBaseURL: string="../../assets/data/table-data.json" //environment.URL_BASE + '/areas/';
  constructor(private http: HttpClient) {
    console.log(environment);
    
   }

 /*  agregarRecurso(recurso){
    return this.http.post(this.recurosBaseURL, recurso).map(r => r);
  }
  modificarRecurso(recurso,id){
    return this.http.put(this.recurosBaseURL+id, recurso).map(r => r);
  }
  eliminarRecurso(id){
    return this.http.delete(this.recurosBaseURL + id).map( r=> r)
  }
  obtenerRecurso(id){
    return this.http.get(this.recurosBaseURL+id, ).map(r => r);

  } */
  listarRecurso(filtros){
    return this.http.get(this.recurosBaseURL, {params: filtros})
               .pipe( 
                 map((r:any) => {
                   let respuesta = {
                     lista:[],
                     pagina: 0,
                     total: 0
                   }

                   console.log(filtros);
                   
                   const page = filtros.pagina;
                   const inicio =filtros.pagina==1? 0: filtros.pagina*page +1
                   const fin = inicio + filtros.cantidad
                   const data = r.lista.slice (inicio,fin)
                   respuesta.lista = data;
                   respuesta.pagina = filtros.pagina
                   respuesta.total = r.total

                   return respuesta;
                   
                 })
                );
  }
}
