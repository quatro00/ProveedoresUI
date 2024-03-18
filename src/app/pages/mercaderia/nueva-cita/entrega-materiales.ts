import {
  Component
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'entrega-materiales',
  template: `
<div>
  <h4 class="text-[20px] font-medium mb-[20px] text-dark dark:text-white/[.87]">2. Ingresa la entrega de materiales</h4>
  <form class="max-w-full" [formGroup]="validateForm">
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
                
                </tbody>
              </nz-table>
            </div>
        </div>
</div>
`,
})
export class EntregaMaterialesComponent {
  validateForm!: UntypedFormGroup;

  listOfOption = [
    { label: 'Jack', value: 'jack' },
    { label: 'Lucy', value: 'lucy' },
    { label: 'disabled', value: 'disabled', disabled: true }
  ];

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      desde: [null, [Validators.required]],
      hasta: [null, [Validators.required]],
      razonSocial: [null, [Validators.required]],
    });
  }

}
