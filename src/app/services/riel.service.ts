import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { CentroModel } from '../models/centro/centro-model';
import { RielModel, grupoDeArticuloModel } from '../models/riel/riel-model';

@Injectable({
  providedIn: 'root'
})
export class RielService {

  service:string = 'Riel';


  constructor(private http:HttpClient, private cookieService: CookieService) { }

  create(request:RielModel):Observable<RielModel>{
    return this.http.post<RielModel>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }

  createGrupoArticulo(request:grupoDeArticuloModel):Observable<grupoDeArticuloModel>{
    return this.http.post<grupoDeArticuloModel>(`${environment.apiBaseUrl}/api/${this.service}/CreateGrupoArticulo`,request);
  }

  getByCentro(request:string):Observable<RielModel[]>{
    let params = new HttpParams().append('centroId', request);

    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}`,{params});
  }

  getAll():Observable<CentroModel[]>{
    return this.http.get<CentroModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  update(id:string, request:CentroModel):Observable<CentroModel>{
    return this.http.put<CentroModel>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }
}