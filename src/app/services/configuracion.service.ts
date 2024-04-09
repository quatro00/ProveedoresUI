import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ConfiguracionRequestModel } from '../models/configuracion/configuracion-request-model';
import { ConfiguracionModel } from '../models/configuracion/configuracion-model';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  service:string = 'Configuracion';

  constructor(private http:HttpClient, private cookieService: CookieService) { }


  get():Observable<ConfiguracionModel[]>{
    return this.http.get<ConfiguracionModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  update(id:string, request:ConfiguracionRequestModel):Observable<any>{
    return this.http.put<any>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }
}