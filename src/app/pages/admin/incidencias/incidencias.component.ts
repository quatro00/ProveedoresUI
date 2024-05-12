import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent {

  isVisibleEditarConfiguracion = false;
  isLoading = true;
  showContent = false;
  bloqueos:any[]=[];
  btnLoadingBusqueda = false;
  ambiente =  environment.apiBaseUrl;

  validateForm!: UntypedFormGroup;

  constructor(
    private msg: NzMessageService,
    private router: Router, 
    private incidenciasService:IncidenciasService,
    private fb: UntypedFormBuilder,
    ) {}

  ngOnInit() {

    this.validateForm = this.fb.group({
      desde: [null, [Validators.required]],
      hasta: [null, [Validators.required]],
    });

    this.loadData();
  }

  loadData() {
   
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }

  handleCancel(){
    this.isVisibleEditarConfiguracion = false;
  }

  registrarIncidencia(){
    this.router.navigateByUrl(`administrador/incidencias/crear-incidencia`); 
  }

  submitForm(){
    if (this.validateForm.valid) {
      this.btnLoadingBusqueda=true;
      
      let fechaInicio:string = this.validateForm.value.desde;
      let fechaTermino:string = this.validateForm.value.hasta;

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
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  verArchivo(id:string){
    window.open(`${environment.apiBaseUrl}/api/Incidencias/GetArchivo?incidenciaId=${id}`, '_blank');
  }
}
