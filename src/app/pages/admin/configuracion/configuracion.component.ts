import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ConfiguracionModel } from 'src/app/models/configuracion/configuracion-model';
import { ConfiguracionRequestModel } from 'src/app/models/configuracion/configuracion-request-model';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {

  isVisibleEditarConfiguracion = false;
  btnLoading = false;
  isLoading = true;
  showContent = false;
  configuraciones:ConfiguracionModel[]=[];

  validateForm!: UntypedFormGroup;

  id?: number;
  valorEntero?: string;  
  valorDecimal?: string;
  valorString?: string;
  valorDate?: string;
  
  ngOnInit() {
    // Simulate loading time
    this.validateForm = this.fb.group({
      valorEntero: [null],
      valorDecimal: [null],
      valorString: [null],
      valorFecha: [null]
    });

    this.loadData();
  }

  showGruposArticulo(newItem: TemplateRef<{}>, model:ConfiguracionModel) {

    this.valorEntero = model.valorEntero;
    this.valorDecimal = model.valorDecimal;
    this.valorString = model.valorString;
    this.valorDate = model.valorDate;
    this.id = model.id;

    this.validateForm.setValue({
      valorEntero: this.valorEntero,
      valorDecimal: this.valorDecimal,
      valorString: this.valorString,
      valorFecha: this.valorDate
  })

    this.isVisibleEditarConfiguracion = true;
    //this.rielSelected = model;
  }

  submitForm(): void {
    //console.log(this.validateForm.valid);
    if (this.validateForm.valid) {
      var request:ConfiguracionRequestModel = {
        valorEntero: this.validateForm.value.valorEntero,
        valorDecimal: this.validateForm.value.valorDecimal,
        valorString: this.validateForm.value.valorString,
        valorDate: this.validateForm.value.valorFecha,
      };
      
      console.log(request);

      this.btnLoading = true;


      this.configuracionService.update(this.id.toString(),request)
      .subscribe({
        next:(response)=>{
          this.loadData();
          this.modalService.closeAll();
          this.validateForm.reset();
          this.btnLoading = false;
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

  handleCancel(){
    this.isVisibleEditarConfiguracion = false;
  }

  loadData() {
    // Simulate an asynchronous data loading operation
    this.configuracionService.get()
    .subscribe({
      next: (response) => {
        this.  configuraciones = response;
        this.isLoading = false;
        this.showContent = true;
      }
    })

    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }

  constructor(
    private modalService: NzModalService,
    private configuracionService: ConfiguracionService,
    private fb: FormBuilder,   
  ) { }

}
