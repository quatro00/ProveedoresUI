import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ProveedorFiltroResponsableModel } from '../models/proveedores/proveedor-filtro-response-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  service:string = 'Proveedor';

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  GetProveedoresByFiltro():Observable<ProveedorFiltroResponsableModel[]>{
    let params = new HttpParams();
    params = params.append('filtro', '');

    return this.http.get<ProveedorFiltroResponsableModel[]>(`${environment.apiBaseUrl}/api/${this.service}/GetProveedoresByFiltro`,{params});

  }

  getAdministradores():Observable<any>{
    return this.http.get<any>(`${environment.apiBaseUrl}/api/${this.service}/GetAdministradores`);
  }
}
