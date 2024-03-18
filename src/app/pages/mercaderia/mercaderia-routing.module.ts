import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CitasComponent } from './citas/citas.component';
import { NuevaCitaComponent } from './nueva-cita/nueva-cita.component';

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
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MercaderiaRoutingModule { }
