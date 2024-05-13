import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { MensajeModel } from '../models/mensajes/mensaje-model';
import { CrearMensajeModel } from '../models/mensajes/crear-mensaje-model';
//import { PrioridadModel } from '../models/prioridad/prioridad-model';
//import { PrioridadListModel } from '../models/prioridad/prioridad-list-model';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  service:string = 'MensajesInstitucionales';

  constructor(private http:HttpClient, private cookieService: CookieService) { }

 
  getAll():Observable<MensajeModel[]>{
    return this.http.get<MensajeModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  create(formData:FormData):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}`,formData);
  }

 /*
  

  update(id:string, request:PrioridadModel):Observable<PrioridadModel>{
    return this.http.put<PrioridadModel>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }

  getPrioridades():Observable<PrioridadListModel[]>{
    return this.http.get<PrioridadListModel[]>(`${environment.apiBaseUrl}/api/${this.service}/GetPrioridades`);
  }
  */
}
