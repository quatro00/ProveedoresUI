import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CrearIncidenciaModel } from 'src/app/models/incidencia/crear-incidencia-model';
import { ProveedorFiltroResponsableModel } from 'src/app/models/proveedores/proveedor-filtro-response-model';
import { AsnService } from 'src/app/services/asn.service';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { ProveedorService } from 'src/app/services/proveedores.service';

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
  selector: 'app-crear-administrador',
  templateUrl: './crear-administrador.component.html',
  styleUrls: ['./crear-administrador.component.css']
})
export class CrearAdministradorComponent {
  isVisibleEditarConfiguracion = false;
  isLoading = true;
  showContent = false;
  btnLoadingBusqueda = false;
  isVisible = false;

  validateForm!: UntypedFormGroup;
  crearIncidenciaForm!:UntypedFormGroup;

  proveedores:ProveedorFiltroResponsableModel[]=[];
  bloqueos:any[]=[];
  tiposIncidencias:any[]=[];
  archivo:any=null;
  asn:string='';
  citaId:string='';
  ordenCompra:string='';

  constructor(
    private msg: NzMessageService,
    private router: Router, 
    private fb: UntypedFormBuilder,
    private proveedorService:ProveedorService,
    private incidenciasService:IncidenciasService,
    private asnService:AsnService
    ) {}

  ngOnInit() {

    this.crearIncidenciaForm = this.fb.group({
      tipoIncidencia: [null, [Validators.required]],
      fecha: [null, [Validators.required]],
      comentario: [null, [Validators.required]],
      video: [null, [Validators.required]],
      archivo: [null, [Validators.required]],
    });

    this.validateForm = this.fb.group({
      proveedor: [null, [Validators.required]],
      desde: [null, [Validators.required]],
      hasta: [null, [Validators.required]],
    });

    this.loadData();
  }

  loadData() {
   
    this.incidenciasService.GetTiposIncidencia()
    .subscribe({
      next: (response) => {
       this.tiposIncidencias = response;
      }
    })

    this.proveedorService.GetProveedoresByFiltro()
    .subscribe({
      next: (response) => {
        this.proveedores = response;
        this.isLoading = false;
        this.showContent = true;
      }
    })
    

  }

  

  registrarIncidencia(){
    this.router.navigateByUrl(`administrador/incidencias/crear-incidencia-asn`); 
  }

  submitForm(){
    if (this.validateForm.valid) {
      this.btnLoadingBusqueda=true;
      let proveedorId:string = this.validateForm.value.proveedor;
      let fechaInicio:string = this.validateForm.value.desde;
      let fechaTermino:string = this.validateForm.value.hasta;

      this.asnService.GetAsnPorFecha(proveedorId, fechaInicio, fechaTermino)
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

  muestraRegistraIncidencia(item):void{
    console.log(item);
    this.asn = item.asn;
    this.citaId = item.citaId;
    this.ordenCompra = item.ordenCompra;
    this.crearIncidenciaForm.reset();
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  onFileSelectPdf(event): void {
    if (event.target.files.length > 0) {
      this.archivo = event.target.files[0];
    }
  }

  submitCrearIncidenciaForm(){
    if (this.crearIncidenciaForm.valid) {
      this.btnLoadingBusqueda=true;
      
      
      const formData = new FormData();
    

    formData.append('asn',this.asn);
    formData.append('ordenCompra', this.ordenCompra);
    formData.append('citaId', this.citaId);
    formData.append('tipoIncidenciaId', this.crearIncidenciaForm.value.tipoIncidencia);
    formData.append('comentario', this.crearIncidenciaForm.value.comentario);
    formData.append('fecha',this.crearIncidenciaForm.value.fecha);
    formData.append('video',this.crearIncidenciaForm.value.video);
    formData.append('file', this.archivo);

      this.incidenciasService.CrearIncidencia(formData)
      .subscribe({
        next: (response) => {
          console.log(response);
          //this.bloqueos = response;
        },
        complete:()=>{
          this.btnLoadingBusqueda = false;
          this.isVisible = false;
        },
        error:()=>{
          this.btnLoadingBusqueda = false;
        }
      })


    } else {
      Object.values(this.crearIncidenciaForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
