import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { CentroModel } from '../models/centro/centro-model';
import { CitaOrdenCompra } from '../models/cita/orden-compra-model';
import { AgendaModel, AgendaPaqueteriaModel } from '../models/cita/agenda-model';
import { RegistrarCita } from '../models/cita/registrar-cita-model';
import { CitaByCentroModel } from '../models/cita/cita-by-centro-model';
import { CitaFechaResponseModel } from '../models/cita/cita-fecha-response-model';
import { CancelarCitaRequestModel } from '../models/cita/cancelar-cita-request-model';
import { GetOrdenCompraRequest } from '../models/orden-compra/get-orden-compra-model';
import { ActualizarEstatusOC } from '../models/orden-compra/actualizar-estatus-oc-model';

@Injectable({
  providedIn: 'root'
})
export class OrdenesCompraService {

  service:string = 'OrdenCompra';

  constructor(private http:HttpClient, private cookieService: CookieService) { }


  GetOrdenesCompra(request:GetOrdenCompraRequest):Observable<any[]>{
    return this.http.post<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetOrdenesCompra`,request);
  }

  GetOCDetalle(id:string):Observable<any>{
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get<any>(`${environment.apiBaseUrl}/api/${this.service}/GetOCDetalle/${id}`);
  }

  CambiarEstatus(request:ActualizarEstatusOC):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/CambiarEstatus`,request);
  }

  GetOCPdf(id:string):Observable<any>{
    return this.http.get<any>(`${environment.apiBaseUrl}/api/${this.service}/GetOCPdf/${id}`);
  }
}