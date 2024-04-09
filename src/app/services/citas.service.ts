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

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  service:string = 'Citas';

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  getOrdenesDeCompraAgendar(fechaInicio:string, fechaTermino:string, noProveedor:string, centro:string):Observable<CitaOrdenCompra[]>{
    let params = new HttpParams();
    params = params.append('fechaInicio', fechaInicio);
    params = params.append('fechaTermino', fechaTermino);
    params = params.append('noProveedor', noProveedor);
    params = params.append('centro', 'centro');

    return this.http.get<CitaOrdenCompra[]>(`${environment.apiBaseUrl}/api/${this.service}/GetOrdenesDeCompraAgendar`,{params});
  }

  getCitasFechas(fechaInicio:string, fechaTermino:string, noProveedor:string):Observable<CitaFechaResponseModel[]>{
    let params = new HttpParams();
    params = params.append('proveedorId', noProveedor);
    params = params.append('inicio', fechaInicio);
    params = params.append('termino', fechaTermino);

    return this.http.get<CitaFechaResponseModel[]>(`${environment.apiBaseUrl}/api/${this.service}/GetCitasFechas`,{params});
  }
  
  getAgendaOC(request:CitaOrdenCompra[]):Observable<AgendaModel>{
    return this.http.post<AgendaModel>(`${environment.apiBaseUrl}/api/${this.service}/GetAgendaOC`,request);
  }

  getAcuse(id:string):Observable<any>{
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get(`${environment.apiBaseUrl}/api/${this.service}/GetAcusePdf/${id}`);
  }

  crearCita(request:RegistrarCita):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/CrearCita`,request);
  }

  cancelarCita(request:CancelarCitaRequestModel):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/CancelarCita`,request);
  }

  getCitasCentro(centro:string):Observable<CitaByCentroModel[]>{
    let params = new HttpParams();
    params = params.append('id', centro);

    return this.http.get<CitaByCentroModel[]>(`${environment.apiBaseUrl}/api/${this.service}/GetCitas`,{params});
  }
}