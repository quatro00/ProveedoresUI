import { signal, ChangeDetectorRef,TemplateRef,ViewEncapsulation  } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { NzModalService } from 'ng-zorro-antd/modal';
import enGbLocale from '@fullcalendar/core/locales/es';
import { FormBuilder } from '@angular/forms';

import {
  Component
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';

import {
  NzFormTooltipIcon
} from 'ng-zorro-antd/form';
import { INITIAL_EVENTS } from '../citas/event-utils';

@Component({
  selector: 'fecha-anden',
  template: `
  <h4 class="text-[20px] font-medium mb-[20px] text-dark dark:text-white/[.87]">3. Selecciona la fecha y el horario de entrega</h4>
 <div class="calendar-container">
        <full-calendar style="height: 800px!important;" class="calendar-container relative bg-white main-calendar dark:bg-white/10 rounded-10 p-[25px] overflow-x-auto" *ngIf='calendarVisible()' [options]='calendarOptions()'>
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

  calendarVisible = signal(true);

  calendarOptions = signal<CalendarOptions>({
    views: {
      timeGridWeek: {
        dayMaxEventRows: 0, // No muestra eventos de todo el día en la vista de timeGridWeek
        slotMinTime: '08:00:00', // Hora mínima (8 am)
        slotMaxTime: '18:00:00',  // Hora máxima (6 pm)
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
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: false,
    selectable: false,
    selectMirror: true,
    //select: this.handleDateSelect.bind(this),
    //eventClick: this.handleEventClick.bind(this),
    //eventsSet: this.handleEvents.bind(this),
    locale: enGbLocale,
    validRange: {
      start: '2024-03-10', // Fecha de inicio del rango válido
      end: '2024-03-30'     // Fecha de fin del rango válido
    }
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

  passwordVisible = false;
  password?: string;

  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({
            onlySelf: true
          });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): {
    [s: string]: boolean
  } => {
    if (!control.value) {
      return {
        required: true
      };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {
        confirm: true,
        error: true
      };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      city: [null, [Validators.required]],
      house: [null, [Validators.required]],
      zip: [null, [Validators.required]],
      cmName: [null, [Validators.required]],
      apartment: [null, [Validators.required]],
      lucy: [null, [Validators.required]],
    });
  }

  listOfOption = [
    { label: 'Jack', value: 'jack' },
    { label: 'Lucy', value: 'lucy' },
    { label: 'disabled', value: 'disabled', disabled: true }
  ];
}
