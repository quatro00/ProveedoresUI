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
import { AgendaModel } from 'src/app/models/cita/agenda-model';

@Component({
  selector: 'fecha-anden',
  template: `
  <h4 class="text-[20px] font-medium mb-[20px] text-dark dark:text-white/[.87]">3. Selecciona la fecha y el horario de entrega</h4>
 <div class="calendar-container">
        <full-calendar class="calendar-container relative bg-white main-calendar dark:bg-white/10 rounded-10 p-[25px] overflow-x-auto" *ngIf='calendarVisible()' [options]='calendarOptions()'>
          <ng-template #eventContent let-arg>
            <div [ngClass]="['rounded-4 px-[5px] overflow-x-hidden w-full bg-' + arg.event.extendedProps.label]">
              <h6 class="text-[15px] text-white font-normal capitalize">{{ arg.event.title }}</h6>
              <p class="text-[13px] text-white" *ngIf="arg.event.extendedProps.description">{{ arg.event.extendedProps.description }}</p>
              <div class="{{arg.event.extendedProps.label}}"></div>
            </div>
          </ng-template>
        </full-calendar>
      </div>
`,
})
export class FechaAndenComponent {
  @Input() ordenesCompra:CitaOrdenCompra[]=[];
  @Output() enviarDatos = new EventEmitter<CitaOrdenCompra[]>();

  eventos:any[] = [];
  calendarVisible = signal(true);
  fechaMin = '';
  fechaMax = '';
  eventoSeleccionado = null;

  calendarOptions = signal<CalendarOptions>({
    views: {
      timeGridWeek: {
        dayMaxEventRows: 0, // No muestra eventos de todo el día en la vista de timeGridWeek
        slotMinTime: '08:00:00', // Hora mínima (8 am)
        //slotMaxTime: '18:00:00',  // Hora máxima (6 pm)
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
    //select: this.handleDateSelect.bind(this),
    //eventClick: this.handleEventClick.bind(this),
    //eventsSet: this.handleEvents.bind(this),
    locale: enGbLocale,
    validRange: {
      start: this.fechaMin, // Fecha de inicio del rango válido
      end: this.fechaMax     // Fecha de fin del rango válido
    },
    eventClick: this.handleEventClick.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);

  calendarOptions2: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, listPlugin], // Add listPlugin here if you want the list view
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },
    // Add any other configurations you need...
  };
  constructor(private fb: UntypedFormBuilder, private citasService:CitasService, private modalService: NzModalService,) {}

  handleEventClick(clickInfo: any) {

    if(clickInfo.event.extendedProps.disponible == false){
      this.modalService.info({
        nzTitle: '<span class="text-dark dark:text-white/[.87]">Confirmación de cita</span>',
        nzContent: `<div class="text-light dark:text-white/60 text-[15px]">Favor de seleccionar un horario disponible</div>`,
        nzClassName: 'confirm-modal',
        nzOnOk: () => {
          //this.isReviewOrderFinished = true;
          //this.showConfirmation = true;
        }
      });
      return;
    }
    //si seleccionamos el mismo lo pintamos verde y apagamos el evento seleccionado
    if(clickInfo.event.id == this.eventoSeleccionado){
      this.eventoSeleccionado = null;
      const event = clickInfo.event;
      this.enviarDatos.emit(null);
      event.setProp('color', 'green');
      return;
    }

    if(this.eventoSeleccionado == null){
      this.eventoSeleccionado = clickInfo.event.id;
      const event = clickInfo.event;
      event.setProp('color', 'blue');

      var evento = this.eventos.find(x => x.id === clickInfo.event.id);
      this.enviarDatos.emit(evento);
      return;
    }

    if(clickInfo.event.id != this.eventoSeleccionado){
      this.modalService.info({
        nzTitle: '<span class="text-dark dark:text-white/[.87]">Confirmación de cita</span>',
        nzContent: `<div class="text-light dark:text-white/60 text-[15px]">No es posible seleccionar dos horarios?</div>`,
        nzClassName: 'confirm-modal',
        nzOnOk: () => {
          //this.isReviewOrderFinished = true;
          //this.showConfirmation = true;
        }
      });

      return;
    }

     /*
    this.eventoSeleccionado = clickInfo.event.id;
    const event = clickInfo.event;
    event.setProp('color', 'blue');


    console.log('Evento clickeado:', clickInfo.event.title);
    console.log('Evento clickeado:', clickInfo.event.id)
    var evento = this.eventos.find(x => x.id === clickInfo.event.id);
    

    var fecha = 'fecha';
    console.log(evento);

   
    let yearMax: number = evento.start.getFullYear();
    let monthMax: number = evento.start.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11 en JavaScript
    let dayMax: number = evento.start.getDate();

    let horaInicio = evento.start.getMinutes();
    let minutosInicio =  evento.start.getHours();

    let horaTermino = evento.end.getMinutes();
    let minutosTermino =  evento.end.getHours();

    switch(monthMax){
      case 1:
    }
   
    this.modalService.confirm({
      nzTitle: '<span class="text-dark dark:text-white/[.87]">Confirmación de cita</span>',
      nzContent: `<div class="text-light dark:text-white/60 text-[15px]">Deseas agendar el siguiente horario ${fecha}?</div>`,
      nzClassName: 'confirm-modal',
      nzOnOk: () => {
        //this.isReviewOrderFinished = true;
        //this.showConfirmation = true;
      }
    });
 */
    // Aquí puedes agregar cualquier otra lógica que desees realizar cuando se hace clic en un evento
  }
  
  confirm(): void {
    
  }

  updateCalendarOptions(newOptions: any) {
    this.calendarOptions = { ...this.calendarOptions, ...newOptions }; // Fusiona las opciones actuales con las nuevas
  }

  updateValidRange(start: Date, end: Date, eventos:any[]) {
    this.eventos = eventos;
    this.calendarOptions.set({ validRange: { start: start, end: end },events:eventos });
    //this.calendarOptions.set({ events: eventos });
    
    //this.updateCalendarOptions({ validRange: { start: start, end: end } });
  }

  addNewEvents(newEvents: any[]) {
    //const currentEvents = this.calendarOptions.get().events;
    const updatedEvents = [...newEvents];
    this.calendarOptions.set({ events: updatedEvents });
  }

  ngOnInit(): void {
   console.log('Ordenes a analizar!',this.ordenesCompra);
   this.citasService.getAgendaOC(this.ordenesCompra)
   .subscribe({
    next:(response:AgendaModel)=>{
      console.log('Agenda',response);
      let fechas: Date[] = response.bloques.map(obj => new Date(obj.fecha));

      // Encontrar la fecha mínima y máxima
      let fechaMinima: Date = new Date(Math.min(...fechas.map(date => date.getTime())));
      let fechaMaxima: Date = new Date(Math.max(...fechas.map(date => date.getTime())));

      let yearMin: number = fechaMinima.getFullYear();
      let monthMin: number = fechaMinima.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11 en JavaScript
      let dayMin: number = fechaMinima.getDate();
      
      let yearMax: number = fechaMaxima.getFullYear();
      let monthMax: number = fechaMaxima.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11 en JavaScript
      let dayMax: number = fechaMaxima.getDate();

      //console.log(yearMin, monthMin, dayMin);
      //console.log(yearMax, monthMax, dayMax);
      //console.log("Fecha mínima:", fechaMinima); // Imprime la fecha mínima en formato ISO
      //console.log("Fecha máxima:", fechaMaxima); // Imprime la fecha máxima en formato ISO

      this.fechaMin = `${yearMin}-${monthMin.toString().padStart(2, '0')}-${dayMin.toString().padStart(2, '0')}`;
      this.fechaMax = `${yearMax}-${monthMax.toString().padStart(2, '0')}-${dayMax.toString().padStart(2, '0')}`;

      var eventos:any[]=[];
      response.bloques.forEach(element => {
        eventos.push(...element.bloquesAndenes);
      });
      this.updateValidRange(fechaMinima, fechaMaxima, eventos)
      //console.log("Fecha mínima:", fechaFormateadaMin); // Imprime la fecha mínima en formato ISO
      //console.log("Fecha máxima:", fechaFormateadaMax); // Imprime la fecha máxima en formato ISO
      //this.ordenesCompra=response;
      //this.razonesSociales = response.razonesSociales;
    },
    complete:()=>{
      //this.btnLoading = false;
    }
  })
  }

 
}
