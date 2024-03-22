import { Component, signal, ChangeDetectorRef,TemplateRef,ViewEncapsulation  } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi  } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { NzModalService } from 'ng-zorro-antd/modal';
import enGbLocale from '@fullcalendar/core/locales/es';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { INITIAL_EVENTS, createEventId } from '../../mercaderia/citas/event-utils';
import { CentrosService } from 'src/app/services/centros.service';
import { CentroModel } from 'src/app/models/centro/centro-model';
import { CitasService } from 'src/app/services/citas.service';


@Component({
  selector: 'app-citas',
  templateUrl: './citas-diarias.component.html',
  styleUrls: ['./citas-diarias.component.css'],
  styles:  [`
  :host ::ng-deep .basic-select .ant-select-selector{
    @apply h-[50px] rounded-4 border-normal px-[20px] flex items-center dark:bg-white/10 dark:border-white/10 dark:text-white/60 dark:hover:text-white/100;
  }
  :host ::ng-deep .basic-select.ant-select-multiple .ant-select-selection-item{
      @apply bg-white dark:bg-white/10 border-normal dark:border-white/10;
    }
    ::ng-deep .ant-upload {
      @apply w-full;
    }
    :host ::ng-deep .basic-select .ant-select-multiple.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector{
      @apply dark:bg-white/10 dark:border-white/10 dark:text-white/60 dark:hover:text-white/100;
    }
  `],

})
export class CitasDiariasComponent {

  
  isVisible = false;
  isLoading = true;
  showContent = false;
  showContentCalendar = false;
  resources:any[] = [];

  validateForm!: UntypedFormGroup;
  validateForm_paqueteria!: UntypedFormGroup;
  centros:CentroModel[]=[];
  eventos:any[] = [];

  radioValue:string;

  calendarVisible = signal(true);

  calendarOptions = signal<CalendarOptions>({
    views: {
      timeGridWeek: {
        dayMaxEventRows: 0, // No muestra eventos de todo el día en la vista de timeGridWeek
        slotMinTime: '08:00:00', // Hora mínima (8 am)
        slotDuration: '00:15:00',
        displayEventTime: true
      }
      // Puedes configurar más vistas si es necesario
    },
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,title,next',
      right: ''
    },
    initialView: 'timeGridWeek',
    visibleRange: {
      start: '2024-03-17', // Fecha de inicio del rango visible
      end: '2024-03-23'     // Fecha de fin del rango visible
    },
    initialEvents: this.eventos, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: false,
    selectable: false,
    selectMirror: true,
    locale: enGbLocale,
  });
  currentEvents = signal<EventApi[]>([]);


  constructor(
    private changeDetector: ChangeDetectorRef,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private usuariosservice: UsuariosService,
    private centrosService:CentrosService,
    private citasService:CitasService ) {
  }



  

 
  ngOnInit() {
    this.centrosService.getAll()
    .subscribe({
      next:(response)=>{
        this.centros = response;
        this.isLoading = false;
        this.showContent = true;
        this.showContentCalendar = true;
        console.log(this.centros);
      }})
    

    //this.loadData();
  }

  onCentroChange(centroId: string) {
    console.log(centroId);
    var centro = this.centros.find(x=>x.id == centroId);
    if(centro.rieles == null){
      this.resources = [];
    }
    else{
      this.resources = centro.rieles.map(riel => ({ id: riel.id, title: riel.riel }));
    }
    
    console.log(this.resources);

    this.showContentCalendar = false;
    this.citasService.getCitasCentro(centroId)
    .subscribe({
      next:(response)=>{
        console.log(response);
        this.eventos = response;
        this.showContentCalendar = true;
        this.calendarOptions.set({ events:response });
      }});
  }
}
