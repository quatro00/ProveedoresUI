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
import { CitasDiariasComponent } from './citas-diarias/citas-diarias.component';
import { BloquearAndenesComponent } from './bloquear-andenes/bloquear-andenes.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { CrearIncidenciaComponent } from './crear-incidencia/crear-incidencia.component';
import { TiposIncidenciaComponent } from './tipos-incidencia/tipos-incidencia.component';
import { CrearIncidenciaOcComponent } from './crear-incidencia-oc/crear-incidencia-oc.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { CrearAdministradorComponent } from './crear-administrador/crear-administrador.component';

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
    path: 'crear-administrador',
    component: CrearAdministradorComponent,
    data: {
        title: 'Crear administrador',
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
  {
    path: 'citas-diarias',
    component: CitasDiariasComponent,
    data: {
        title: 'Citas diarias',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'bloquear-andenes',
    component: BloquearAndenesComponent,
    data: {
        title: 'Bloquear andenes',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent,
    data: {
        title: 'Configuracion',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'incidencias',
    component: IncidenciasComponent,
    data: {
        title: 'Incidencias',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'tipos-incidencia',
    component: TiposIncidenciaComponent,
    data: {
        title: 'Incidencias',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'incidencias/crear-incidencia-asn',
    component: CrearIncidenciaComponent,
    data: {
        title: 'Incidencias',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'incidencias/crear-incidencia-oc',
    component: CrearIncidenciaOcComponent,
    data: {
        title: 'Incidencias',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'departamentos',
    component: DepartamentoComponent,
    data: {
        title: 'departamentos',
    },
    //canActivate: [authAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
