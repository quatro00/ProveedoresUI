import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { MaterialEntregaModel } from '../models/material-entrega/material-entrega-model';
import { MaterialEntregaTiempoRequestModel } from '../models/material-entrega/material-tiempo-request-model';

@Injectable({
  providedIn: 'root'
})
export class MaterialEntregaService {

  service:string = 'MaterialEntrega';

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  getAll():Observable<MaterialEntregaModel[]>{
    return this.http.get<MaterialEntregaModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  create(request:MaterialEntregaTiempoRequestModel[]):Observable<MaterialEntregaTiempoRequestModel[]>{
    return this.http.post<MaterialEntregaTiempoRequestModel[]>(`${environment.apiBaseUrl}/api/${this.service}/InsMaterialEntregaList`,request);
  }

/*
  

  update(id:string, request:CentroModel):Observable<CentroModel>{
    return this.http.put<CentroModel>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }
  */
}