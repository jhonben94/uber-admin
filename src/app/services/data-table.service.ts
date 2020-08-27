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
  listarRecurso(){
    return this.http.get(this.recurosBaseURL);                  
  }
}
