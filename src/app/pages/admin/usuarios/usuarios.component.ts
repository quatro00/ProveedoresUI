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
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  isVisible = false;
  isVisibleEditar = false;
  showContent = false;
  validateForm!: UntypedFormGroup;
  validateFormEditar!: UntypedFormGroup;
  administradores:any[]=[];
  crearUsuario:CrearUsuarioModel;
  btnLoading = false;
  btnLoadingEditar = false;
  id:string;

  constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,   
    private router: Router, 
    private msg: NzMessageService, 
    private proveedorService:ProveedorService,
    private usuariosService:UsuariosService,
    private rielService:RielService) {}


  handleCancel(){
    this.isVisible = false;
    this.isVisibleEditar = false;
  }

  showNew(newItem: TemplateRef<{}>) {
    this.validateForm.reset();

    this.isVisible = true;
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      nombre: ['',[Validators.required]],
      apellido: ['',[Validators.required]],
      
      correo: ['',[Validators.required]],
      cargo: ['',[Validators.required]],

      telefono: ['',[Validators.required]],
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

      var request:CrearUsuarioModel = {
        apellido:this.validateForm.value.apellido,
        cargo: this.validateForm.value.cargo,
        
        email: this.validateForm.value.correo,
        nombre: this.validateForm.value.nombre,

        nombreDeUsuario: this.validateForm.value.nombreUsuario,
        password: this.validateForm.value.password,

        telefono: this.validateForm.value.telefono,
        tipoCuenta: 'Administrador',
      };
      
      this.btnLoading = true;

      console.log(request);

      this.usuariosService.crearCuentaMaestra(request)
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
    this.proveedorService.getAdministradores()
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
