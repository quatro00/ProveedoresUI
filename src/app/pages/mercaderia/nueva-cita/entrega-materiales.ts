import { HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable/base';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CitaOrdenCompra } from 'src/app/models/cita/orden-compra-model';
@Component({
  selector: 'entrega-materiales',
  template: `

<nz-modal
[nzMaskClosable]="false" [nzKeyboard]="false"  [nzClosable]="false"
      [nzWidth]="'80%'"
      [(nzVisible)]="isVisible"
      [nzTitle]="modalTitle"
      [nzContent]="modalContent"
      [nzFooter]="modalFooter"
      (nzOnCancel)="handleCancel()"
    >
      <ng-template #modalTitle>Carga de tiempos de materiales</ng-template>

      <ng-template #modalContent>
        <div class="p-[25px]">
          <div style="width: 100%;">
            <hot-table
            [data]="data"
            [settings]="hotSettings"
            [hotId]="id"
              [colHeaders]="true"
              [rowHeaders]="true"
              height="auto"
              [autoWrapRow]="true"
              [autoWrapCol]="true"
              licenseKey="non-commercial-and-evaluation">
                <hot-column data="grupoArticulos" title="Grupo de articulo" [readOnly]="true"></hot-column>
                <hot-column data="material" title="Material" [readOnly]="true"></hot-column>
                <hot-column data="unidadMedida" title="Unidad de medida" [readOnly]="true"></hot-column>
                <hot-column data="descripcion" title="Descripcion" [readOnly]="true"></hot-column>
                <hot-column data="cantidadSolicitada" title="Cantidad solicitada" type="numeric" [readOnly]="true"></hot-column>
                <hot-column data="cantidadEntregada" title="Cantidad entregada" type="numeric" [readOnly]="true"></hot-column>
                <hot-column data="cantidadDisponible" title="Cantidad disponible" type="numeric" [readOnly]="true"></hot-column>
                <hot-column data="cantidadAEntregar" title="Cantidad a entregar" type="numeric" *ngIf="tipoSeleccionado === 'Asn'" [readOnly]="true"></hot-column>
                <hot-column data="cantidadAEntregar" title="Cantidad a entregar" type="numeric" *ngIf="tipoSeleccionado === 'Orden de compra'"></hot-column>

            </hot-table>
          </div>
        </div>
      </ng-template>

      <ng-template #modalFooter>
        <button class="bg-primary hover:bg-primary-hbr hover:border-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]" nz-button nzType="primary" (click)="handleOk()" [nzLoading]="btnLoading">Guardar</button>
      </ng-template>
    </nz-modal>

<div>
  <h4 class="text-[20px] font-medium mb-[20px] text-dark dark:text-white/[.87]">2. Ingresa la entrega de materiales</h4>

  <div class="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative">
      <div class="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px]">
        <h4 class="mb-0 text-lg font-medium text-dark dark:text-white/[.87] capitalize">Selecciona el tipo de entrega</h4>
      </div>
      <div class="p-[25px] pt-0">
      <nz-radio-group [(ngModel)]="tipoEntregaSeleccionada" (ngModelChange)="tipoEntregaSelected($event)">
      <label class="dark:text-white/[.87]" nz-radio nzValue="almacen">Entrega en almacen</label>
      <label class="dark:text-white/[.87]" nz-radio nzValue="paqueteria">Entrega en paqueteria</label>
    </nz-radio-group>
      </div>
    </div>

  <form class="max-w-full" [formGroup]="validateForm" *ngIf="false">
    <nz-form-item>
      <nz-form-label class="flex items-center font-medium dark:text-white/60" nzXs="2" nzFor="text2">Ordenes</nz-form-label>
      <nz-form-control nzXs="3" nzErrorTip="Campo requerido." >
        <input formControlName="desde"
          class="w-full rounded-4 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] h-[46px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
          nz-input name="text2" type="text" id="text2" disabled="true">
      </nz-form-control>
      <nz-form-control nzXs="1">
      </nz-form-control>
      <nz-form-label class="flex items-center font-medium dark:text-white/60" nzXs="2" nzFor="text2">Piezas</nz-form-label>
      <nz-form-control nzXs="3" nzErrorTip="Campo requerido." >
        <input formControlName="hasta"
          class="w-full rounded-4 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] h-[46px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
          nz-input name="text2" type="text" id="text2">
      </nz-form-control>
      <nz-form-control nzXs="1">
      </nz-form-control>
      <nz-form-label class="flex items-center font-medium dark:text-white/60" nzXs="2" nzFor="text2">Importe</nz-form-label>
      <nz-form-control nzXs="3" nzErrorTip="Campo requerido." >
        <input formControlName="hasta"
          class="w-full rounded-4 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] h-[46px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
          nz-input name="text2" type="text" id="text2">
      </nz-form-control>
      <nz-form-label class="flex items-center font-medium dark:text-white/60" nzXs="3" nzFor="text2">Tiempo estimado</nz-form-label>
      <nz-form-control nzXs="3" nzErrorTip="Campo requerido." >
        <input formControlName="hasta"
          class="w-full rounded-4 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] h-[46px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
          nz-input name="text2" type="text" id="text2">
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
                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize">Orden de compra/Asn</th>
                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize">Fecha de emision</th>
                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize">Fecha de entrega</th>
                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize">Piezas</th>
                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize">Importe</th>
                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize">Piezas asignadas</th>
                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize">Importe asignado</th>

                    <th class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"></th>
                  </tr>
                </thead>
                <tbody>
                <tr class="group" *ngFor="let item of basicTable.data">
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">{{ item.ordenCompra }}</td>
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">{{ item.fechaOrdenCompra | date: 'dd/MM/yyyy' }}</td> 
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">{{ item.fechaVencimiento | date: 'dd/MM/yyyy' }}</td>
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">{{ item.totalPiezas | number: '1.0-0'}}</td>
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">{{ item.montoTotal | currency}}</td> 
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">{{ sumarPiezas(item) }}</td> 
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">{{ calcularImporte(item) | currency  }}</td>
                   <td class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">
                   <button nz-button
    class="capitalize bg-secondary/10 hover:bg-secondary-hbr border-none text-secondary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]" (click)="entregaDeMateriales(item)">Entrega de materiales</button>

                     
                  </td> 


                  </tr>
                </tbody>
              </nz-table>
            </div>
        </div>
</div>
`,
})
export class EntregaMaterialesComponent {
  @Input() ordenesCompra:CitaOrdenCompra[]=[];
  @Output() enviarDatos = new EventEmitter<CitaOrdenCompra[]>();
  @Output() tipoEntrega = new EventEmitter<string>();

  private hotRegisterer = new HotTableRegisterer();

  tipoEntregaSeleccionada;
  isVisible = false;
  btnLoading = false;
  tipoSeleccionado = '';
  id = 'hotInstance';
  //tipoEntrega;

  data: any[] = [
    ['']
  ];

  hotSettings: Handsontable.GridSettings = {
    minRows: 1,
    rowHeaders: true,
    colHeaders: true,
    stretchH: 'all'
  };


  validateForm!: UntypedFormGroup;

  listOfOption = [
    { label: 'Jack', value: 'jack' },
    { label: 'Lucy', value: 'lucy' },
    { label: 'disabled', value: 'disabled', disabled: true }
  ];

  constructor(private fb: UntypedFormBuilder,private modalService: NzModalService, ) { }

  handleCancel() {
    this.isVisible = false;
  }


  ngOnInit(): void {
    this.ordenesCompra.forEach((element, index) => {
      element.detalle.forEach((detalle, index_2) => {
        if(detalle.cantidadAEntregar == null){
          detalle.cantidadAEntregar = 0;
        }
      });
    });
    this.validateForm = this.fb.group({
      desde: [null, [Validators.required]],
      hasta: [null, [Validators.required]],
      razonSocial: [null, [Validators.required]],
    });
  }

  sumarPiezas(orden: CitaOrdenCompra): number {
    return orden.detalle.reduce((total, detalle) => total + detalle.cantidadAEntregar, 0);
  }

  calcularImporte(orden: CitaOrdenCompra): number {
    return orden.detalle.reduce((total, detalle) => total + (detalle.precio * detalle.cantidadAEntregar), 0);
  }
  
  entregaDeMateriales(item){
    this.tipoSeleccionado = item.tipo;
    item.detalle.forEach((element, index) => {
      if(element.cantidadAEntregar == null){
        element.cantidadAEntregar = 0;
      }
    });
    this.data = item.detalle;
    this.isVisible = true;
  }
  detectarCambios(changes: any) {
    changes.forEach(([row, prop, oldValue, newValue]) => {
      //console.log(`Celda modificada en la fila ${row}, columna ${prop}`);
      //console.log(`Valor anterior: ${oldValue}, Nuevo valor: ${newValue}`);
    });
  }

  tipoEntregaSelected(value){
    
    this.tipoEntrega.emit(this.tipoEntregaSeleccionada);
  }
  handleOk(){
    var captura
    //console.log(this.hotRegisterer.getInstance(this.id).getData());

    this.enviarDatos.emit(this.ordenesCompra);
    
    console.log(this.ordenesCompra);

    var datosValidos = true;
    this.hotRegisterer.getInstance(this.id).getData().forEach((element, index) => {
      if(element[7] > element[6]){
        this.modalService.info({
          nzTitle: '<h2 class="text-dark dark:text-white/[.87]"> Captura de materiales</h2>',
          nzContent: `<p class="text-theme-gray dark:text-white/60">La cantidad a entregar(${element[7]}) del material: ${element[3]} es mayor a la cantidad disponible(${element[6]}).</p>`,
          nzOnOk: () => console.log('Info OK')
        });
        datosValidos = false;
      }
    });

    if(datosValidos){
      this.isVisible = false;
    }
  }
}
