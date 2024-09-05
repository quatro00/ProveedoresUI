import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { MensajeModel } from '../models/mensajes/mensaje-model';
//import { PrioridadModel } from '../models/prioridad/prioridad-model';
//import { PrioridadListModel } from '../models/prioridad/prioridad-list-model';

@Injectable({
  providedIn: 'root'
})
export class AsnService {

  service:string = 'Asn';

  constructor(private http:HttpClient, private cookieService: CookieService) { }

 
  GetAsnPorFecha(proveedorId, desde, hasta):Observable<any[]>{
    let params = new HttpParams();
    params = params.append('proveedorId', proveedorId);
    params = params.append('fechaInicio', desde);
    params = params.append('fechaTermino', hasta);

    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetAsnPorFecha`,{params});

  }
}
