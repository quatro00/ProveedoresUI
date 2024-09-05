import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateDepartamentoRequestModel } from 'src/app/models/departamento/create-departamento-request-model';
import { CentrosService } from 'src/app/services/centros.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { RielService } from 'src/app/services/riel.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent {

  isVisible = false;
  showContent = false;
  validateForm!: UntypedFormGroup;
  btnLoading = false;
  departamentoId = null;
  departamentos:any[]=[];

  constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,   
    private msg: NzMessageService, 
    private departamentoService:DepartamentoService,
    private rielService:RielService) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      idSap: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      
      comprador: [],
      compradorCorreo: [],

      analista: [],
      analistaCorreo: [],
      
      asistente: [],
      asistenteCorreo: [],
      
      activo: [''],
    });

    

    this.loadData();
    
  }

  handleOk(){

    if(this.departamentoId == null){
      this.submitForm();
    }
    else{
      //this.submitUpdForm(this.centroId);
    }
    
  }

  submitForm(): void {
    //console.log(this.validateForm.valid);
    if (this.validateForm.valid) {

      this.btnLoading = true;

      var request:CreateDepartamentoRequestModel = {
        codigoSAP:this.validateForm.value.idSap,
        nombre: this.validateForm.value.descripcion,
        
        compradorCorreo: this.validateForm.value.compradorCorreo,
        comprador: this.validateForm.value.comprador,

        analistaCorreo: this.validateForm.value.analistaCorreo,
        analista: this.validateForm.value.analista,

        asistenteCorreo: this.validateForm.value.asistenteCorreo,
        asistente: this.validateForm.value.asistente,
      };
      
    
      this.btnLoading = true;
      this.departamentoService.create(request)
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
    this.isVisible = false;
  }

  loadData(){
    this.departamentoService.getDepartamentos()
    .subscribe({
      next:(response)=>{
        console.log(response);
        this.departamentos = response;
        
        this.showContent = true;
      }})
  }

  showNew(newItem: TemplateRef<{}>) {
    this.validateForm.reset();

    this.isVisible = true;
  }

}
