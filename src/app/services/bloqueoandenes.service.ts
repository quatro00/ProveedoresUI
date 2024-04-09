import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { CentroModel } from '../models/centro/centro-model';
import { CitaOrdenCompra } from '../models/cita/orden-compra-model';
import { AgendaModel } from '../models/cita/agenda-model';
import { RegistrarCita } from '../models/cita/registrar-cita-model';
import { CitaByCentroModel } from '../models/cita/cita-by-centro-model';
import { CitaFechaResponseModel } from '../models/cita/cita-fecha-response-model';
import { CancelarCitaRequestModel } from '../models/cita/cancelar-cita-request-model';
import { BloquearAndenRequestModel } from '../models/bloquear-andenes/bloquear-anden-request-model';
import { BloqueoModel } from '../models/bloquear-andenes/bloqueo-model';

@Injectable({
  providedIn: 'root'
})
export class BloqueoAndenesService {

  service:string = 'BloquearAndenes';

  constructor(private http:HttpClient, private cookieService: CookieService) { }


  crearBloqueoanden(request:BloquearAndenRequestModel):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/CrearBloqueo`,request);
  }

  cancelarBloqueo(request:CancelarCitaRequestModel):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/CancelarBloqueo`,request);
  }

  getBloqueo(inicio:string, termino):Observable<BloqueoModel[]>{
    let params = new HttpParams();
    params = params.append('inicio', inicio);
    params = params.append('termino', termino);

    return this.http.get<BloqueoModel[]>(`${environment.apiBaseUrl}/api/${this.service}/GetBloqueo`,{params});
  }
}