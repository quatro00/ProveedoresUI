import { DatePipe, registerLocaleData } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BloquearAndenRequestModel } from 'src/app/models/bloquear-andenes/bloquear-anden-request-model';
import { BloqueoModel } from 'src/app/models/bloquear-andenes/bloqueo-model';
import { CancelarBloqueoRequestModel } from 'src/app/models/bloquear-andenes/cancelar-bloqueo-request-model';
import { CentroModel } from 'src/app/models/centro/centro-model';
import { RielModel } from 'src/app/models/riel/riel-model';
import { BloqueoAndenesService } from 'src/app/services/bloqueoandenes.service';
import { CentrosService } from 'src/app/services/centros.service';
import { CitasService } from 'src/app/services/citas.service';
import { RielService } from 'src/app/services/riel.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-bloquear-andenes',
  styles: [`
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
  templateUrl: './bloquear-andenes.component.html',
  styleUrls: ['./bloquear-andenes.component.css']
})
export class BloquearAndenesComponent {

  btnLoading = false;
  btnLoadingBusqueda = false;

  isLoading = true;
  showContent = false;
  isVisible = false;
  centros: CentroModel[] = [];
  filteredData_Riel: RielModel[] = [];
  bloqueos:BloqueoModel[]=[];
  validateForm!: UntypedFormGroup;
  validateFormBloqueo!: UntypedFormGroup;

  ngOnInit() {

    this.centroService.getAll()
      .subscribe({
        next: (response) => {
          this.centros = response;
          this.isLoading = false;
          this.showContent = true;
        }
      })

    this.validateForm = this.fb.group({
      desde: [null, [Validators.required]],
      hasta: [null, [Validators.required]],
    });

    this.validateFormBloqueo = this.fb.group({
      centro: [null, [Validators.required]],
      riel: [null, [Validators.required]],
      fecha: [null, [Validators.required]],
      desde: [null, [Validators.required]],
      hasta: [null, [Validators.required]],
      motivo: [null, [Validators.required]],
    });

  }

  showNew(newItem: TemplateRef<{}>) {
    this.validateForm.reset();
    this.isVisible = true;
  }

  centroSelected(event: any): void {
    //this.validateFormBloqueo.setValue({riel:null});
    this.validateFormBloqueo.get('riel').patchValue('');
    this.filteredData_Riel = [];
    this.rielService.getByCentro(event)
      .subscribe({
        next: (response) => {
          this.filteredData_Riel = response;
        }
      })
    console.log('Opción seleccionada:', event);
    // Aquí puedes realizar las acciones necesarias cuando cambia la opción seleccionada
  }

  submitForm(){
    if (this.validateForm.valid) {
      this.btnLoadingBusqueda = true;
 
    this.bloqueoAndenes.getBloqueo(this.validateForm.value.desde,this.validateForm.value.hasta)
    .subscribe({
      next:(response)=>{
        this.btnLoadingBusqueda = false;
        this.validateForm.reset();
        this.bloqueos = response;
      }
    })
    

    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleOk() {


    if (this.validateFormBloqueo.valid) {
      this.btnLoading = true;

      var request: BloquearAndenRequestModel = {
        centroId: this.validateFormBloqueo.value.centro,
        rielId: this.validateFormBloqueo.value.riel,
        fecha: this.validateFormBloqueo.value.fecha,
        desde: this.validateFormBloqueo.value.desde,
        hasta: this.validateFormBloqueo.value.hasta,
        motivo: this.validateFormBloqueo.value.motivo,
      };

      console.log(request);

      
 
    this.bloqueoAndenes.crearBloqueoanden(request)
    .subscribe({
      next:(response)=>{
        this.isLoading = false;
        this.modalService.closeAll();
        this.validateFormBloqueo.reset();
      }
    })
    

    } else {
      Object.values(this.validateFormBloqueo.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  cancelarBloqueo(item:BloqueoModel){

    var request:CancelarBloqueoRequestModel = { 
      id: item.id,
    }

    this.modalService.confirm({
      nzTitle: '<span class="text-dark dark:text-white/[.87]">Confirmación</span>',
      nzContent: '<div class="text-light dark:text-white/60 text-[15px]">¿Cancelar el bloqueo seleccionado ?</div>',
      nzClassName: 'confirm-modal',
      nzOnOk: () => {
        this.bloqueoAndenes.cancelarBloqueo(request)
        .subscribe({
          next:(response)=>{
            this.submitForm();
            //this.ordenesCompra=response;
            //this.razonesSociales = response.razonesSociales;
          },
          complete:()=>{
            //this.btnLoading = false;
          }
        })
      }
    });
  }

  handleCancel() {
    this.isVisible = false;
  }

  constructor(
    private modalService: NzModalService,
    private msg: NzMessageService,
    private datePipe: DatePipe,
    private fb: UntypedFormBuilder,
    private bloqueoAndenes: BloqueoAndenesService,
    private usuariosService: UsuariosService,
    private centroService: CentrosService,
    private rielService: RielService) { }

}
