import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CrearUsuarioModel, UpdateUsuarioModel } from 'src/app/models/usuario/crear-usuario-model';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { ProveedorService } from 'src/app/services/proveedores.service';
import { RielService } from 'src/app/services/riel.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

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
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {

  isVisible = false;
  isVisibleEditar = false;
  showContent = false;
  validateFormAgregarProveedor!: UntypedFormGroup;
  validateForm!: UntypedFormGroup;
  validateFormEditar!: UntypedFormGroup;
  administradores:any[]=[];
  proveedores:any[]=[];
  crearUsuario:CrearUsuarioModel;
  btnLoading = false;
  btnLoadingEditar = false;
  btnLoadingBuscarProveedor = false;
  id:string;

  constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,   
    private router: Router, 
    private msg: NzMessageService, 
    private proveedorService:ProveedorService,
    private usuarioService:UsuariosService,
    private rielService:RielService) {}


  handleCancel(){
    this.isVisible = false;
    this.isVisibleEditar = false;
  }

  showNew() {
    this.proveedores = [];
    this.validateForm.reset();

    this.isVisible = true;
  }

  ngOnInit() {
    this.validateFormAgregarProveedor = this.fb.group({
      numProveedor: ['',[Validators.required]]
    });

    this.validateForm = this.fb.group({
      nombre: ['',[Validators.required]],
      apellido: ['',[Validators.required]],
      
      correo: ['',[Validators.required]],
      cargo: ['',[Validators.required]],

      telefono: ['',[Validators.required]],
      tipoCuenta: ['',[Validators.required]],
      nombreUsuario: ['',[Validators.required]],
      
      password: ['',[Validators.required]],
      passwordConfirm: ['',[Validators.required]],
    });

    this.validateFormEditar = this.fb.group({
      nombre: ['',[Validators.required]],
      apellido: ['',[Validators.required]],
      
      telefono: ['',[Validators.required]],
      correo: ['',[Validators.required]],
      cargo: ['',[Validators.required]],

    });

    this.loadData();
    
  }

  nuevoAdministrador() {
    this.router.navigateByUrl(`administrador/crear-administrador`); 
  }

  BuscarProveedor(){

    var prov:any[]=this.proveedores;

    this.btnLoadingBuscarProveedor = true;
    var noProveedor = this.validateFormAgregarProveedor.value.numProveedor;
    
    this.usuarioService.buscarProveedorSAP(noProveedor)
    .subscribe({
      next:(response)=>{
        this.btnLoadingBuscarProveedor = false;
        var prov2:any[]=[];
        
        prov.forEach((itm) => {
         prov2.push(itm);
        });
        
        prov2.push(response);

        this.proveedores = prov2;
        console.log(this.proveedores);
        this.validateFormAgregarProveedor.reset();
      },
      error:()=>{
        this.validateFormAgregarProveedor.reset();
        this.btnLoadingBuscarProveedor = false;
      }
    })

  }

  handleOkEditar(){
    if (this.validateFormEditar.valid) {

      var request:UpdateUsuarioModel = {
        nombre: this.validateFormEditar.value.nombre,
        apellido:this.validateFormEditar.value.apellido,
        telefono: this.validateFormEditar.value.telefono,
        correo: this.validateFormEditar.value.correo,
        cargo: this.validateFormEditar.value.cargo,
        
      };
      
      this.btnLoadingEditar = true;

      console.log(request);
      /*
      this.usuariosService.updateAdministrador(this.id, request)
      .subscribe({
        next:(response)=>{
          this.loadData();
          this.modalService.closeAll();
          this.validateForm.reset();
          this.btnLoading = false;
        },
        error:()=>{
          this.btnLoading = false;
        }
      })
      */
    } else {
      Object.values(this.validateFormEditar.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  handleOk(){
    //this.isConfirmLoading = true; 
    if (this.validateForm.valid) {

    
      
      var requestCrearProveedor:any = {
        apellido:this.validateForm.value.apellido,
        cargo: this.validateForm.value.cargo,
        
        email: this.validateForm.value.correo,
        nombre: this.validateForm.value.nombre,
        nombreDeUsuario: this.validateForm.value.nombreUsuario,
        password: this.validateForm.value.password,

        telefono: this.validateForm.value.telefono,
        tipoCuenta: this.validateForm.value.tipoCuenta,
        razonesSociales:[]
      }

      this.proveedores.forEach((itm)=>{

        var razonesSociales:any = {
          numProveedor: itm.numeroProveedor,
          sociedades:[]
        }

        itm.sociedades.forEach((sociedad)=>{
          var sociedad:any=
          {
            nombre:sociedad.nombre,
            sociedad: sociedad.sociedad,
            activo:sociedad.checked ?? false
          };

          razonesSociales.sociedades.push(sociedad);
        })
        
        requestCrearProveedor.razonesSociales.push(razonesSociales);

      });


      this.usuarioService.crearCuentaMaestra(requestCrearProveedor)
      .subscribe({
        next:(response)=>{
          this.loadData();
          this.modalService.closeAll();
          this.validateForm.reset();
          this.btnLoading = false;
        },
        error:()=>{
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


  loadData(){    
    this.proveedorService.getProveedores()
    .subscribe({
      next:(response)=>{
        console.log(response);
        this.administradores = response;
        
        this.showContent = true;
      }})
  }

  showEdit(newItem: TemplateRef<{}>, model:any) {
    this.btnLoadingEditar = false;
    this.id = model.id;
    this.validateFormEditar.setValue({
        nombre: model.nombre,
        apellido: model.apellido,
        telefono: model.telefono,
        cargo:model.cargo,
        correo:model.email
    })

    this.isVisibleEditar = true;
  }
}
