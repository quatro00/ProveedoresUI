import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authAdminGuard } from 'src/app/guard/auth-admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdenCompraComponent } from './orden-compra/orden-compra.component';
import { MensajesInstitucionalesComponent } from './mensajes-institucionales/mensajes-institucionales.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { NuevoMensajeComponent } from './nuevo-mensaje/nuevo-mensaje.component';
import { CentrosDistribucionComponent } from './centros-distribucion/centros-distribucion.component';
import { AndenesComponent } from './andenes/andenes.component';
import { AdministracionMaterialesComponent } from './administracion-materiales/administracion-materiales.component';

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
    path: 'administracion-materiales',
    component: AdministracionMaterialesComponent,
    data: {
        title: 'A dministracion-materiales',
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
        title: 'Nuevo mensaje institucional',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'centros-distribucion',
    component: CentrosDistribucionComponent,
    data: {
        title: 'Centros de distribucion',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'andenes',
    component: AndenesComponent,
    data: {
        title: 'Andenes',
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
