import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AsnPendientesModel } from '../models/facturacion/asn-pendientes-result-model';
import { GetFacturaResultModel } from '../models/facturacion/get-factura-result-model';


@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  service:string = 'Facturacion';

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  getAsnsPendientes(proveedor:string, fecha:string):Observable<AsnPendientesModel[]>{
    let params = new HttpParams();
    params = params.append('proveedorId', proveedor);
    params = params.append('fecha', fecha);

    return this.http.get<AsnPendientesModel[]>(`${environment.apiBaseUrl}/api/${this.service}/GetAsnsPendientes`,{params});

  }

  getFacturas(proveedor:string, fecha:string):Observable<GetFacturaResultModel[]>{
    let params = new HttpParams();
    params = params.append('proveedorId', proveedor);
    params = params.append('fecha', fecha);

    return this.http.get<GetFacturaResultModel[]>(`${environment.apiBaseUrl}/api/${this.service}/GetFacturas`,{params});

  }

  uploadFactura(formData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/UploadFactura`, formData);
  }


}
