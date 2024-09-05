import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TipoIncidenciaModel } from 'src/app/models/incidencia/tipo-incidencia-model';
import { IncidenciasService } from 'src/app/services/incidencias.service';

@Component({
  selector: 'app-tipos-incidencia',
  templateUrl: './tipos-incidencia.component.html',
  styleUrls: ['./tipos-incidencia.component.css']
})
export class TiposIncidenciaComponent {

  isVisibleEditar = false;
  isLoading = true;
  showContent = false;
  btnLoading = false;
  bloqueos:any[]=[];
  btnLoadingBusqueda = false;
  tiposIncidencias:any[]=[];
  
  validateForm!: UntypedFormGroup;
  tipoIncidenciaSelected = '';
  editar = false;
  constructor(
    private msg: NzMessageService, 
    private incidenciasService:IncidenciasService,
    private fb: UntypedFormBuilder,
    ) {}

  ngOnInit() {

   

    this.validateForm = this.fb.group({
      id: [null],
      codigo: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      monto: [null, [Validators.required]],
      activo: [null, [Validators.required]],
      incidenciaCita: [null, [Validators.required]],
      interno: [null, [Validators.required]],
    });

    this.loadData();
  }

  editarTipoIncidencia(model){
    this.editar = true;
    this.isVisibleEditar = true;

    console.log(model);
    this.validateForm.setValue({
      id : model.id,
      codigo : model.codigo,
      nombre:model.descripcion,
      monto:model.monto,
      incidenciaCita:model.incidenciaCita.toString(),
      activo:model.activo.toString(),
      interno:model.interno.toString(),
  })
    this.tipoIncidenciaSelected = model.id;
  }
  loadData() {
   
    
      this.incidenciasService.GetTiposIncidencia()
      .subscribe({
        next: (response) => {
         this.tiposIncidencias = response;
         this.isLoading = false;
        this.showContent = true;
        }
      })
    
  }

  handleCancel(){
    this.isVisibleEditar = false;
  }

  registrarTipoIncidencia(){
    this.editar = false;
    this.validateForm.reset();
    this.isVisibleEditar = true;
  }


  submitForm(){
    if (this.validateForm.valid) {
      var tipoIncidencia:TipoIncidenciaModel = {
        codigo : this.validateForm.value.codigo,
        descripcion : this.validateForm.value.nombre,
        monto : this.validateForm.value.monto,
        activo : this.validateForm.value.activo,
        interno: this.validateForm.value.interno,
        incidenciaCita: this.validateForm.value.incidenciaCita
      }

      console.log(tipoIncidencia);
      this.btnLoading=true;

      if(this.editar == false){
        this.incidenciasService.CrearTipoIncidencia(tipoIncidencia)
        .subscribe({
          next: (response) => {
           
          },
          complete:()=>{
            this.btnLoading = false;
            this.isVisibleEditar = false;
            this.loadData();
          },
          error:()=>{
            this.btnLoading = false;
          }
        })

      }
      else{
        this.incidenciasService.UpdateTipoIncidencia(this.validateForm.value.id, tipoIncidencia)
        .subscribe({
          next: (response) => {
            //console.log(response);
          },
          complete:()=>{
            this.btnLoading = false;
            this.isVisibleEditar = false;
            this.loadData();
          },
          error:()=>{
            this.btnLoading = false;
          }
        })
      }
      console.log(tipoIncidencia);
      /*
      this.incidenciasService.GetIncidencias(null, fechaInicio, fechaTermino)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.bloqueos = response;
        },
        complete:()=>{
          this.btnLoadingBusqueda = false;
        },
        error:()=>{
          this.btnLoadingBusqueda = false;
        }
      })
      */
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
