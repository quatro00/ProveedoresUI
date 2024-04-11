import { signal, ChangeDetectorRef,TemplateRef,ViewEncapsulation, ViewChild  } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { NzModalService } from 'ng-zorro-antd/modal';
import enGbLocale from '@fullcalendar/core/locales/es';
import { FormBuilder } from '@angular/forms';
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { INITIAL_EVENTS } from '../citas/event-utils';
import { CitaOrdenCompra } from 'src/app/models/cita/orden-compra-model';
import { CitasService } from 'src/app/services/citas.service';
import { AgendaModel, AgendaPaqueteriaModel } from 'src/app/models/cita/agenda-model';

@Component({
  selector: 'fecha-anden-paqueteria',
  template: `
  <h4 class="text-[20px] font-medium mb-[20px] text-dark dark:text-white/[.87]">3. Selecciona la fecha de entrega</h4>
  <form class="max-w-full">
    <nz-form-item>
      <nz-form-label class="flex items-center font-medium dark:text-white/60" nzXs="2" nzFor="text2">Fecha de entrega</nz-form-label>
      <nz-form-control class="mb-[20px]" nzXs="5">
      <nz-select (ngModelChange)="seleccion($event)"[(ngModel)]="fechaSeleccionada" class="w-full capitalize [&>nz-select-top-control]:border-regular dark:[&>nz-select-top-control]:border-white/10 [&>nz-select-top-control]:bg-white [&>nz-select-top-control]:dark:bg-white/10 [&>nz-select-top-control]:shadow-none [&>nz-select-top-control]:text-dark [&>nz-select-top-control]:dark:text-white/60 [&>nz-select-top-control]:h-[50px] [&>nz-select-top-control]:flex [&>nz-select-top-control]:items-center [&>nz-select-top-control]:rounded-[6px] [&>nz-select-top-control]:px-[20px] [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60" 
      name="lucy" 
      >

      <nz-option *ngFor="let fecha of fechas" [nzValue]="fecha" [nzLabel]="fecha"></nz-option>

      </nz-select>
      </nz-form-control>
    </nz-form-item>
  </form>
`,
})
export class FechaAndenPaqueteriaComponent {
  @Input() ordenesCompra:CitaOrdenCompra[]=[];
  @Output() enviarDatos = new EventEmitter<CitaOrdenCompra[]>();
  @Output() fechaEntregaPaqueteria = new EventEmitter<string>();

  eventos:any[] = [];
  fechas:string[]=[];
  calendarVisible = signal(true);
  fechaMin = '';
  fechaMax = '';
  eventoSeleccionado = null;
  fechaSeleccionada;

  
  seleccion(event: any){
    console.log(event);
    this.fechaEntregaPaqueteria.emit(event);
  }
 
  constructor(private fb: UntypedFormBuilder, private citasService:CitasService, private modalService: NzModalService,) {}

 
  

  ngOnInit(): void {
   console.log('Ordenes a analizar!',this.ordenesCompra);
   this.citasService.GetAgendaPaqueteriaOC(this.ordenesCompra)
   .subscribe({
    next:(response:AgendaPaqueteriaModel)=>{
      console.log('fechas disponibles',response);
      this.fechas = response.fechas;
    },
    complete:()=>{
      //this.btnLoading = false;
    }
  })
  }

 
}
