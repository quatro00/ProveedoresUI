import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { MensajeModel } from '../models/mensajes/mensaje-model';
import { CrearIncidenciaModel } from '../models/incidencia/crear-incidencia-model';
import { GetIncidenciasModel } from '../models/incidencia/get-incidencias-model';
import { TipoIncidenciaModel } from '../models/incidencia/tipo-incidencia-model';
//import { PrioridadModel } from '../models/prioridad/prioridad-model';
//import { PrioridadListModel } from '../models/prioridad/prioridad-list-model';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  service:string = 'Incidencias';

  constructor(private http:HttpClient, private cookieService: CookieService) { }

 
  GetIncidencias(proveedorId, desde, hasta):Observable<GetIncidenciasModel[]>{
    let params = new HttpParams();
    //params = params.append('proveedorId', proveedorId);
    params = params.append('inicio', desde);
    params = params.append('termino', hasta);

    return this.http.get<GetIncidenciasModel[]>(`${environment.apiBaseUrl}/api/${this.service}/GetIncidencias`,{params});

  }

  GetTiposIncidencia():Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetTiposIncidencia`);
  }

  CrearIncidencia(formData:FormData):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/CreateIncidencia`, formData);
  }

  CrearIncidenciaCita(formData:FormData):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/CreateIncidenciaCita`, formData);
  }

  CrearTipoIncidencia(request:TipoIncidenciaModel):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/CrearTipoIncidencia`,request);
  }

  UpdateTipoIncidencia(id:string, request:TipoIncidenciaModel):Observable<any>{
    return this.http.put<any>(`${environment.apiBaseUrl}/api/${this.service}/UpdateTipoIncidencia/${id}`,request);
  }
}
