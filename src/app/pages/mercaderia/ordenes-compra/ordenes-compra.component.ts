import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActualizarEstatusOC } from 'src/app/models/orden-compra/actualizar-estatus-oc-model';
import { GetOrdenCompraRequest } from 'src/app/models/orden-compra/get-orden-compra-model';
import { RazonesSociale } from 'src/app/models/usuario/byuser-model';
import { OrdenesCompraService } from 'src/app/services/ordenes-compra.service';
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
  selector: 'app-ordenes-compra',
  templateUrl: './ordenes-compra.component.html',
  styleUrls: ['./ordenes-compra.component.css']
})
export class OrdenesCompraComponent {
  btnLoading = false;
  btnLoadingModal = false;
  btnLoadingModificacion = false;
  btnLoadingAceptarOC = false;
  showContent = false;
  isLoading = true;
  isVisible = false;
  isVisibleModificacion = false;
  isVisibleAceptar = false;
  ordenCompraEstatus:number;
  ordenCompraId:string;

  razonesSociales:RazonesSociale[]=[];
  ordenCompraDetalle:any[]=[];
  citas:any[];
  ordenCompra:any;
  validateForm!: UntypedFormGroup;
  modificarOrdenForm!: UntypedFormGroup;
  pricing: any[]; // Store the cards data

  constructor(
    private modalService: NzModalService, 
    private msg: NzMessageService,
    private datePipe: DatePipe,
    private fb: UntypedFormBuilder,
    private ordenesCompraService: OrdenesCompraService,
    private usuariosService: UsuariosService,private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('../../../assets/data/pages/pricing.json').subscribe(data => {
      this.pricing = data.pricing;
    });


    this.usuariosService.getByUser()
    .subscribe({
      next:(response)=>{
        //console.log(response);
        this.razonesSociales = response.razonesSociales;
        
        this.isLoading = false;
        this.showContent = true;
        //this.isVisible = false;
        //this.btnLoading = false;
      }
    })


    this.modificarOrdenForm = this.fb.group({
      comentario: [null, [Validators.required]],
    });

    this.validateForm = this.fb.group({
      desde: [null, [Validators.required]],
      hasta: [null, [Validators.required]],
      razonSocial: [null, [Validators.required]],
    });

  }

  handleCancel() {
    this.isVisible = false;
  }

  handleCancelModificacion(){
    this.isVisibleModificacion = false;
  }

  handleCancelAceptar(){
    this.isVisibleAceptar = false;
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      
      let request:GetOrdenCompraRequest = 
      {
        fechaInicio: this.validateForm.value.desde,
        fechaTermino: this.validateForm.value.hasta,
        proveedorId: this.validateForm.value.razonSocial,
      }

      this.ordenesCompraService.GetOrdenesCompra(request)
      .subscribe({
        next:(response)=>{
          this.citas = response;
          //this.razonesSociales = response.razonesSociales;
        },
        complete:()=>{
          this.btnLoading = false;
        },
        error:()=>{
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

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }

  showDetalleOrdenCompra(item:any){
    this.ordenCompraEstatus = item.estatusId;
    this.ordenCompraId = item.id;
    this.ordenesCompraService.GetOCDetalle(item.id)
    .subscribe({
      next:(response)=>{
        this.ordenCompra = response.result;
        this.ordenCompraDetalle = this.ordenCompra.detalle;
        this.isVisible = true;    
      }
    })
    
  }

  solicitarModificacion(){
    this.isVisibleModificacion = true;
  }

  aceptarOrden(){
    this.isVisibleAceptar = true;
  }

  aceptarModificacion(){
    if (this.modificarOrdenForm.valid) {
      this.btnLoadingModificacion = true;
      let request:ActualizarEstatusOC = 
      {
        observaciones: this.modificarOrdenForm.value.comentario,
        estatus: 4,
        ordenCompraId: this.ordenCompraId,
      }

      this.ordenesCompraService.CambiarEstatus(request)
    .subscribe({
      next:(response)=>{
        this.btnLoadingModificacion = false;
        //this.razonesSociales = response.razonesSociales;
        this.submitForm();
      },
      complete:()=>{
        this.btnLoadingModificacion = false;
        this.isVisibleModificacion = false;
        this.isVisible = false;
      },
      error:()=>{
        this.btnLoadingModificacion = false;
        this.isVisibleModificacion = false;
        this.isVisible = false;
      }
    })


    } else {
      Object.values(this.modificarOrdenForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({
            onlySelf: true
          });
        }
      });
    }
  }

  aceptarOrdenCompra(){
    
    this.btnLoadingAceptarOC = true;
    let request:ActualizarEstatusOC = 
    {
      observaciones: 'Orden aceptada',
      estatus: 3,
      ordenCompraId: this.ordenCompraId,
    }

    this.ordenesCompraService.CambiarEstatus(request)
    .subscribe({
      next:(response)=>{
        this.btnLoadingAceptarOC = false;
        //this.razonesSociales = response.razonesSociales;
        this.submitForm();
      },
      complete:()=>{
        this.btnLoadingAceptarOC = false;
        this.isVisibleAceptar = false;
        this.isVisible = false;
      },
      error:()=>{
        this.btnLoadingAceptarOC = false;
        this.isVisibleAceptar = false;
        this.isVisible = false;
      }
    })
  }

  OrdenCompraPdf(id:string){
    window.open(`${environment.apiBaseUrl}/api/OrdenCompra/GetOCPdf/${id}`, '_blank');
  }

  OrdenCompraExcel(id:string){
    window.open(`${environment.apiBaseUrl}/api/OrdenCompra/GetOCExcel/${id}`, '_blank');
  }

  OrdenCompraTxt(id:string){
    window.open(`${environment.apiBaseUrl}/api/OrdenCompra/GetOCTxt/${id}`, '_blank');
  }
}
