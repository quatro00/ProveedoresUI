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


  
  getAgendaOC(request:CitaOrdenCompra[]):Observable<AgendaModel>{
    return this.http.post<AgendaModel>(`${environment.apiBaseUrl}/api/${this.service}/GetAgendaOC`,request);
  }

  crearCita(request:RegistrarCita):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/CrearCita`,request);
  }

  getCitasCentro(centro:string):Observable<CitaByCentroModel[]>{
    let params = new HttpParams();
    params = params.append('id', centro);

    return this.http.get<CitaByCentroModel[]>(`${environment.apiBaseUrl}/api/${this.service}/GetCitas`,{params});
  }
}