import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authAdminGuard } from 'src/app/guard/auth-admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdenCompraComponent } from './orden-compra/orden-compra.component';
import { MensajesInstitucionalesComponent } from './mensajes-institucionales/mensajes-institucionales.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { NuevoMensajeComponent } from './nuevo-mensaje/nuevo-mensaje.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
        title: 'Dashboard',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'orden-compra',
    component: OrdenCompraComponent,
    data: {
        title: 'Ordenes de compra',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'mensajes-institucionales',
    component: MensajesInstitucionalesComponent,
    data: {
        title: 'Mensajes Institucionales',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'mensajes-institucionales/nuevo-mensaje',
    component: NuevoMensajeComponent,
    data: {
        title: 'Mensajes Institucionales',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: {
        title: 'Usuarios',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'proveedores',
    component: ProveedoresComponent,
    data: {
        title: 'Proveedores',
    },
    //canActivate: [authAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
