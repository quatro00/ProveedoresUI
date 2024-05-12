
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from "@angular/common";
import { SharedModule } from '../../shared/shared.module';

import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgChartsModule  } from 'ng2-charts';
import { NgApexchartsModule } from "ng-apexcharts";
import { EditorModule } from '@tinymce/tinymce-angular';
import { GoogleMapsModule } from '@angular/google-maps';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzOptionComponent, NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AdminRoutingModule } from './admin-routing.module';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfectScrollbarModule } from 'ngx-om-perfect-scrollbar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { OrdenCompraComponent } from './orden-compra/orden-compra.component';
import { ThemeConstantService } from 'src/app/shared/services/theme-constant.service';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { MensajesInstitucionalesComponent } from './mensajes-institucionales/mensajes-institucionales.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NuevoMensajeComponent } from './nuevo-mensaje/nuevo-mensaje.component';
import { CentrosDistribucionComponent } from './centros-distribucion/centros-distribucion.component';
import { AndenesComponent } from './andenes/andenes.component';
import { AdministracionMaterialesComponent } from './administracion-materiales/administracion-materiales.component';
import { HotTableModule } from '@handsontable/angular';

import { registerAllModules } from 'handsontable/registry';
import { CitasDiariasComponent } from './citas-diarias/citas-diarias.component';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BloquearAndenesComponent } from './bloquear-andenes/bloquear-andenes.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { CrearIncidenciaComponent } from './crear-incidencia/crear-incidencia.component';
import { TiposIncidenciaComponent } from './tipos-incidencia/tipos-incidencia.component';

const antdModule = [
  HotTableModule.forRoot(),
  NzButtonModule,
  NzModalModule,
  NzPaginationModule,
  NzDropDownModule,
  AngularSvgIconModule.forRoot(),
  NgChartsModule,
  NgApexchartsModule,
  NzLayoutModule,
  NzGridModule,
  NzSkeletonModule,
  //FeaturesRoutingModule,
  AdminRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  NzInputModule,
  NzFormModule,
  NzInputNumberModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzSelectModule,
  NzUploadModule,
  NzCheckboxModule,
  NzRadioModule,
  NzTagModule,
  NzSwitchModule,
  NzSliderModule,
  NzTableModule,
  EditorModule,
  //DashboardModule,
 // AppsModule,
  NzProgressModule,
  NzAvatarModule,
  NzToolTipModule,
  //NzStepsModule,
  GoogleMapsModule,
  NzCalendarModule,
  FullCalendarModule,
  

]


registerAllModules();

@NgModule({
  declarations: [
    DashboardComponent,
    OrdenCompraComponent,
    UsuariosComponent,
    ProveedoresComponent,
    MensajesInstitucionalesComponent,
    NuevoMensajeComponent,
    CentrosDistribucionComponent,
    AndenesComponent,
    AdministracionMaterialesComponent,
    CitasDiariasComponent,
    BloquearAndenesComponent,
    ConfiguracionComponent,
    IncidenciasComponent,
    CrearIncidenciaComponent,
    TiposIncidenciaComponent,
  ],
  imports: [
    CommonModule,
        SharedModule,
        NzCardModule,
        HttpClientModule,
    ...antdModule
  ],
  providers: [
    ThemeConstantService,
    NzMessageService,
    DatePipe
  ]
})
export class AdminModule { }
