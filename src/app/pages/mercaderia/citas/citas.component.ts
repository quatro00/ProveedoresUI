import { Component, signal, ChangeDetectorRef,TemplateRef,ViewEncapsulation  } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { NzModalService } from 'ng-zorro-antd/modal';
import enGbLocale from '@fullcalendar/core/locales/es';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
  styles: [`
  :host ::ng-deep nz-radio-group label{
      @apply dark:bg-white/10 dark:border-white/10 dark:text-white/[.87];
    }
    :host ::ng-deep nz-radio-group label.ant-radio-button-wrapper-checked{
      @apply dark:bg-primary dark:border-primary dark:text-white;
    }
    :host ::ng-deep .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
      @apply bg-primary text-white;
    }
    :host ::ng-deep .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-child{
      @apply border-primary;
    }
    :host ::ng-deep .ant-radio-button-wrapper-checked:not([class*=" ant-radio-button-wrapper-disabled"]).ant-radio-button-wrapper:first-child {
      @apply border-r-primary;
    }
    :host ::ng-deep .ant-radio-button-wrapper {
        @apply leading-[1.6] px-[25.25px] border-[#f1f2f6] dark:border-white/10 bg-white text-theme-gray;
    }
    :host ::ng-deep .ant-radio-button-wrapper:not(:first-child)::before {
        @apply bg-[#f1f2f6] dark:bg-white/10;
    }
    :host ::ng-deep .ant-radio-button-wrapper.ant-radio-button-wrapper-disabled {
      @apply opacity-[0.4];
    }


   :host ::ng-deep nz-radio-group label{
      @apply dark:bg-white/10 dark:border-white/10 dark:text-white/[.87];
    }
    :host ::ng-deep nz-radio-group label.ant-radio-button-wrapper-checked{
      @apply dark:bg-primary dark:border-primary dark:text-white;
    }
    :host ::ng-deep .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
      @apply bg-primary text-white;
    }
    :host ::ng-deep .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-child{
      @apply border-primary;
    }
    :host ::ng-deep .ant-radio-button-wrapper-checked:not([class*=" ant-radio-button-wrapper-disabled"]).ant-radio-button-wrapper:first-child {
      @apply border-r-primary;
    }
    :host ::ng-deep .ant-radio-button-wrapper {
        @apply leading-[1.6] px-[25.25px] border-[#f1f2f6] dark:border-white/10 bg-white text-theme-gray;
    }
    :host ::ng-deep .ant-radio-button-wrapper:not(:first-child)::before {
        @apply bg-[#f1f2f6] dark:bg-white/10;
    }
    :host ::ng-deep .ant-radio-button-wrapper.ant-radio-button-wrapper-disabled {
      @apply opacity-[0.4];
    }
`],

})
export class CitasComponent {
  isVisible = false;
  isLoading = true;
  showContent = false;
  validateForm!: UntypedFormGroup;
  validateForm_paqueteria!: UntypedFormGroup;

  radioValue:string;

  calendarVisible = signal(true);

  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'today,prev,title,next',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: false,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    //select: this.handleDateSelect.bind(this),
    //eventClick: this.handleEventClick.bind(this),
    //eventsSet: this.handleEvents.bind(this),
    locale: enGbLocale
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

  constructor(
    private changeDetector: ChangeDetectorRef,
    private modalService: NzModalService,
    private fb: FormBuilder, ) {
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.mutate((options) => {
      options.weekends = !options.weekends;
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

 
  ngOnInit() {
    console.log(this.radioValue);
    // Simulate loading time
    this.validateForm = this.fb.group({
      inicio: ['',[Validators.required]],
      termino: ['',[Validators.required]]
    });

    this.validateForm_paqueteria = this.fb.group({
      fecha: ['',[Validators.required]]
    });
    this.loadData();
  }

  log(value: string[]): void {
    console.log(value);
  }

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }

  showNew(){
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }
}
