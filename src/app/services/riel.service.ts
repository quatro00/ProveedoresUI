import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { CentroModel } from '../models/centro/centro-model';
import { RielModel } from '../models/riel/riel-model';

@Injectable({
  providedIn: 'root'
})
export class RielService {

  service:string = 'Riel';

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  create(request:RielModel):Observable<RielModel>{
    return this.http.post<RielModel>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }

  getAll():Observable<CentroModel[]>{
    return this.http.get<CentroModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  

  update(id:string, request:CentroModel):Observable<CentroModel>{
    return this.http.put<CentroModel>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }
}