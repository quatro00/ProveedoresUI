
import { DatePipe } from '@angular/common';
import {
  Component, Input, Output,EventEmitter
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
import { CitaOrdenCompra } from 'src/app/models/cita/orden-compra-model';
import { RazonesSociale } from 'src/app/models/usuario/byuser-model';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'busqueda-ordenes-compra',
  template: `
<div>
  <h4 class="text-[20px] font-medium mb-[20px] text-dark dark:text-white/[.87]">1. Buqueda de ordenes de compra o asns</h4>
  <form class="max-w-full" [formGroup]="validateForm">
    <nz-form-item>
      <nz-form-label class="flex items-center font-medium dark:text-white/60" nzXs="3" nzFor="text2">Fecha de entrega</nz-form-label>
      <nz-form-control nzXs="3" nzErrorTip="Campo requerido." >
        <input formControlName="desde"
          class="w-full rounded-4 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] h-[46px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
          nz-input name="text2" type="date" id="text2">
      </nz-form-control>
      <nz-form-control nzXs="1">
      </nz-form-control>
      <nz-form-label class="flex items-center font-medium dark:text-white/60" nzXs="2" nzFor="text2">Hasta</nz-form-label>
      <nz-form-control nzXs="3" nzErrorTip="Campo requerido." >
        <input formControlName="hasta"
          class="w-full rounded-4 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] h-[46px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
          nz-input name="text2" type="date" id="text2">
      </nz-form-control>
      <nz-form-control nzXs="1">
      </nz-form-control>
      <nz-form-label class="flex items-center font-medium dark:text-white/60" nzXs="2" nzFor="text2">Razon social</nz-form-label>
      <nz-form-control class="mb-[20px]" nzXs="5">
      <nz-select class="w-full capitalize [&>nz-select-top-control]:border-regular dark:[&>nz-select-top-control]:border-white/10 [&>nz-select-top-control]:bg-white [&>nz-select-top-control]:dark:bg-white/10 [&>nz-select-top-control]:shadow-none [&>nz-select-top-control]:text-dark [&>nz-select-top-control]:dark:text-white/60 [&>nz-select-top-control]:h-[50px] [&>nz-select-top-control]:flex [&>nz-select-top-control]:items-center [&>nz-select-top-control]:rounded-[6px] [&>nz-select-top-control]:px-[20px] [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60" 
      name="lucy" 
      formControlName="razonSocial" >

      <nz-option *ngFor="let option of razonesSociales" [nzValue]="option.numProveedor" [nzLabel]="option.nombre"></nz-option>

      </nz-select>
      </nz-form-control>
      <nz-form-control nzXs="1">
      </nz-form-control>
      <nz-form-control nzXs="1">
      <button [nzLoading]="btnLoading" (click)="submitForm()" class="bg-primary hover:bg-primary-hbr inline-flex items-center outline-none shadow-none w-fit duration-300 text-white capitalize px-[20px] text-[15px] border-primary hover:border-primary-hbr rounded-[5px] gap-[8px] h-[46px]" nz-button nzType="primary" >
            <span>Buscar</span>
            <span nz-icon nzType="search" nzTheme="outline"></span>
          </button>
      </nz-form-control>
    </nz-form-item>
  </form>
  <div class="p-[25px]">
          <div class="w-full overflow-x-auto">
              <nz-table #basicTable 
              nzShowSizeChanger
              [nzData]="ordenesCompra"
              >
                <thead>
                  <tr>
                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize">Tipo</th>
                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize">Orden de compra</th>
                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize">Asn</th>
                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize">Centro</th>
                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize">Fecha de emision</th>
                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize">Fecha de entrega</th>
                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize">Piezas</th>
                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize">Importe</th>
                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"></th>
                  </tr>
                </thead>
                <tbody>
                <tr class="group" *ngFor="let item of basicTable.data">
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">Orden de compra</td>
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">{{ item.ordenCompra }}</td> 
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent"></td>
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">{{ item.centro }}</td> 
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">{{ item.fechaOrdenCompra | date: 'dd/MM/yyyy' }}</td> 
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">{{ item.fechaVencimiento | date: 'dd/MM/yyyy' }}</td>
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">{{ item.totalPiezas | number: '1.0-0'}}</td>
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">{{ item.montoTotal | currency}}</td> 
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">
                   <nz-switch [(ngModel)]="item.isActive"  (ngModelChange)="onChangeSwitch($event, item)"></nz-switch>

                     
                  </td> 


                  </tr>
                </tbody>
              </nz-table>
            </div>
        </div>
</div>
`,
})
export class BusquedaOrdenesCompraComponent {
  @Input() razonesSociales: RazonesSociale[];
  @Output() enviarDatos = new EventEmitter<CitaOrdenCompra[]>();
  @Output() enviarProveedor = new EventEmitter<string>();

  btnLoading = false;
  passwordVisible = false;
  password?: string;
  ordenesCompra:CitaOrdenCompra[]=[];
  proveeedorId:string;

  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  listOfOption = [
    { label: 'Jack', value: 'jack' },
    { label: 'Lucy', value: 'lucy' },
    { label: 'disabled', value: 'disabled', disabled: true }
  ];

  onChangeSwitch(checked: boolean, item: any) {
    item.activo = checked;
    const datos = this.ordenesCompra;
    this.enviarDatos.emit(datos);
    // Aquí puedes realizar otras acciones según sea necesario
  }

  submitForm(): void {
    if (this.validateForm.valid) {

      const desde = this.formatearFecha(this.validateForm.value.desde);
      const hasta = this.formatearFecha(this.validateForm.value.hasta);
      //this.proveeedorId = this.validateForm.value.razonSocial;
      this.enviarProveedor.emit(this.validateForm.value.razonSocial);
      //console.log(desde,hasta);
      this.citasService.getOrdenesDeCompraAgendar(desde, hasta, this.validateForm.value.razonSocial,'')
      .subscribe({
        next:(response)=>{
          //console.log(response);
          this.ordenesCompra=response;
          //this.razonesSociales = response.razonesSociales;
        },
        complete:()=>{
          this.btnLoading = false;
        }
      })
      

      this.btnLoading = true;
      
      
      //this.citasService.getOrdenesDeCompraAgendar()
      //console.log('submit!', this.validateForm.value);
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

  formatearFecha(fecha: string): string {
    const fechaFormateada = this.datePipe.transform(fecha, 'yyyyMMdd');
    return fechaFormateada || ''; // Devolver una cadena vacía si la fecha es nula o indefinida
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(
    private datePipe: DatePipe,
    private fb: UntypedFormBuilder,
    private citasService: CitasService) { }

  ngOnInit(): void {
    

    this.validateForm = this.fb.group({
      desde: [null, [Validators.required]],
      hasta: [null, [Validators.required]],
      razonSocial: [null, [Validators.required]],
    });
  }
}
