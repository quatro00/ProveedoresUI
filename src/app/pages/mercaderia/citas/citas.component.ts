
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { CancelarCitaRequestModel } from 'src/app/models/cita/cancelar-cita-request-model';
import { CitaFechaResponseModel } from 'src/app/models/cita/cita-fecha-response-model';
import { RazonesSociale } from 'src/app/models/usuario/byuser-model';
import { CitasService } from 'src/app/services/citas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';

@Component({
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
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
  
})
export class CitasComponent {
  btnLoading = false;
  isLoading = true;
  showContent = false;
 
  razonesSociales:RazonesSociale[]=[];
  citas:CitaFechaResponseModel[]=[];

  validateForm!: UntypedFormGroup;


  ngOnInit() {
    // Simulate loading time
    this.usuariosService.getByUser()
    .subscribe({
      next:(response)=>{
        //console.log(response);
        this.razonesSociales = response.razonesSociales;
        console.log(response);
        this.isLoading = false;
        this.showContent = true;
        //this.isVisible = false;
        //this.btnLoading = false;
      }
    })


    this.validateForm = this.fb.group({
      desde: [null, [Validators.required]],
      hasta: [null, [Validators.required]],
      razonSocial: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      
      this.citasService.getCitasFechas(this.validateForm.value.desde, this.validateForm.value.hasta, this.validateForm.value.razonSocial)
      .subscribe({
        next:(response)=>{
          console.log(response);
          this.citas = response;
          //this.ordenesCompra=response;
          //this.razonesSociales = response.razonesSociales;
        },
        complete:()=>{
          this.btnLoading = false;
        }
      })
      

      this.btnLoading = true;
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

  // Upload
  constructor(
    private modalService: NzModalService, 
    private msg: NzMessageService,
    private datePipe: DatePipe,
    private fb: UntypedFormBuilder,
    private citasService: CitasService,
    private usuariosService: UsuariosService,) {}

    verDetalle(item){
      console.log(item);
    }

    showAcuseCita(item:CitaFechaResponseModel){
      window.open(`${environment.apiBaseUrl}/api/Citas/GetAcusePdf/${item.id}`, '_blank');
    }

    showAcuseCitaXls(item:CitaFechaResponseModel){
      window.open(`${environment.apiBaseUrl}/api/Citas/GetAcuseXls/${item.id}`, '_blank');
    }

    cancelarCita(item:CitaFechaResponseModel){

      var request:CancelarCitaRequestModel = { 
        id: item.id,
      }

      this.modalService.confirm({
        nzTitle: '<span class="text-dark dark:text-white/[.87]">Confirmación</span>',
        nzContent: '<div class="text-light dark:text-white/60 text-[15px]">¿Cancelar la cita con folio ' + item.folio.toString() +' ?</div>',
        nzClassName: 'confirm-modal',
        nzOnOk: () => {
          this.citasService.cancelarCita(request)
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

 
}
