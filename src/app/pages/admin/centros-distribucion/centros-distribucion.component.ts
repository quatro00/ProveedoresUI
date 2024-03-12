
import { Component, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { CentroModel } from 'src/app/models/centro/centro-model';
import { CentrosService } from 'src/app/services/centros.service';
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
  selector: 'app-centros-distribucion',
  templateUrl: './centros-distribucion.component.html',
  styleUrls: ['./centros-distribucion.component.css']
})
export class CentrosDistribucionComponent {
  isLoading = true;
  showContent = false;
  centros:CentroModel[] = [];
  filteredData: CentroModel[] = [];
  validateForm!: UntypedFormGroup;
  centroId:string;
  isChecked:boolean;

   // Upload
   constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,   
    private msg: NzMessageService, 
    private centrosService:CentrosService) {}


  ngOnInit() {
    this.validateForm = this.fb.group({
      idSap: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      activo: [''],
    });
    this.loadData();
    
  }

  loadData(){
    this.centrosService.getAll()
    .subscribe({
      next:(response)=>{
        console.log(response);
        this.centros = response;
        this.filteredData = response;

        this.isLoading = false;
        this.showContent = true;
      }
    })
  }
  showNew(newItem: TemplateRef<{}>) {
    this.isChecked = false;
    this.validateForm.reset();
    const modal = this.modalService.create({
        nzTitle: 'Crear centro',
        nzContent: newItem,
        nzFooter: [
            {
                label: 'Registrar',
                type: 'primary',
                onClick: () => {
                  this.submitForm();
                }
            },
        ],
        nzWidth: 620
    })
  }

  showEdit(newItem: TemplateRef<{}>, model:any) {
    console.log(model.activo);
    this.isChecked = model.activo;
    this.validateForm.setValue({
        idSap : model.idSap,
        descripcion : model.descripcion,
        activo:0
    })

    const modal = this.modalService.create({
        nzTitle: 'Editar centro',
        nzContent: newItem,
        nzFooter: [
            {
                label: 'Actualizar',
                type: 'primary',
                onClick: () => {
                  this.submitUpdForm(model.id);
                },
                isLoading: this.isChecked // Estableces isLoading a true para activar el indicador de carg
            },
        ],
        nzWidth: 620
    })
  }

  log(value: string[]): void {
    console.log(value);
    if(value.length == 0){
      this.isChecked = false;
    }
    else{
      this.isChecked = true;
    }
  }

  submitForm(): void {
    console.log(this.validateForm.valid);
    if (this.validateForm.valid) {
      var request:CentroModel = {
        idSap: this.validateForm.value.idSap,
        descripcion: this.validateForm.value.descripcion,
        activo: this.isChecked,
      };
      
      console.log(request);

      
      this.centrosService.create(request)
      .subscribe({
        next:(response)=>{
          this.loadData();
          this.modalService.closeAll();
          this.validateForm.reset();
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

  submitUpdForm(id:string): void {
    console.log(this.validateForm);
    if (this.validateForm.valid) {
      console.log(this.validateForm);
      
      
      var request:CentroModel = {
        idSap: this.validateForm.value.idSap,
        descripcion: this.validateForm.value.descripcion,
        activo: this.isChecked,
      };
      
      console.log(request, id);
      this.centrosService.update(id, request)
      .subscribe({
        next:(response)=>{
          this.modalService.closeAll();
          this.validateForm.reset();
          this.loadData();
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

}
