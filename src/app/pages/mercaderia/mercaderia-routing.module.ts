import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CitasComponent } from './citas/citas.component';
import { NuevaCitaComponent } from './nueva-cita/nueva-cita.component';
import { ReporteFacturasComponent } from './reporte-facturas/reporte-facturas.component';
import { SubirFacturaComponent } from './subir-factura/subir-factura.component';
import { OrdenesCompraComponent } from './ordenes-compra/ordenes-compra.component';

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
    path: 'citas',
    component: CitasComponent,
    data: {
        title: 'Citas',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'citas/nueva-cita',
    component: NuevaCitaComponent,
    data: {
        title: 'Citas',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'facturacion/subir-factura',
    component: SubirFacturaComponent,
    data: {
        title: 'Reporte de facturas',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'facturacion/reporte-facturas',
    component: ReporteFacturasComponent,
    data: {
        title: 'Reporte de facturas',
    },
    //canActivate: [authAdminGuard]
  },
  {
    path: 'ordenes-compra',
    component: OrdenesCompraComponent,
    data: {
        title: 'Ordenes de compra',
    },
    //canActivate: [authAdminGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MercaderiaRoutingModule { }
