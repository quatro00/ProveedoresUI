import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioCmbModel } from '../models/usuario/usuario-model';
import { ByUserModel } from '../models/usuario/byuser-model';
import { CrearUsuarioModel, UpdateUsuarioModel } from '../models/usuario/crear-usuario-model';
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

  getByUser():Observable<ByUserModel>{
    return this.http.get<ByUserModel>(`${environment.apiBaseUrl}/api/${this.service}/ByUser`);
  }

  crearCuentaMaestra(request:CrearUsuarioModel):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/CrearCuentaMaestra`,request);
  }

  updateAdministrador(id:string, request:UpdateUsuarioModel):Observable<any>{
    return this.http.put<any>(`${environment.apiBaseUrl}/api/${this.service}/UpdateAdministrador/${id}`,request);
  }
}