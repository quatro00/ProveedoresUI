import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { CentroModel } from '../models/centro/centro-model';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {

  service:string = 'Centro';

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  getAll():Observable<CentroModel[]>{
    return this.http.get<CentroModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  create(request:CentroModel):Observable<CentroModel>{
    return this.http.post<CentroModel>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }

  update(id:string, request:CentroModel):Observable<CentroModel>{
    return this.http.put<CentroModel>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }

  /*
  

  



  getPrioridades():Observable<PrioridadListModel[]>{
    return this.http.get<PrioridadListModel[]>(`${environment.apiBaseUrl}/api/${this.service}/GetPrioridades`);
  }
  */
}
