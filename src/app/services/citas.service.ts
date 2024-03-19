import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { CentroModel } from '../models/centro/centro-model';
import { CitaOrdenCompra } from '../models/cita/orden-compra-model';

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
}