import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioCmbModel } from '../models/usuario/usuario-model';
//import { PrioridadModel } from '../models/prioridad/prioridad-model';
//import { PrioridadListModel } from '../models/prioridad/prioridad-list-model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  service:string = 'Usuarios';

  constructor(private http:HttpClient, private cookieService: CookieService) { }

 
  get():Observable<UsuarioCmbModel[]>{
    return this.http.get<UsuarioCmbModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

}