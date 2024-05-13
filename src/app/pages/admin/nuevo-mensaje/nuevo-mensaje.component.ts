
import { Component } from '@angular/core';
import { FormGroup, FormControl, UntypedFormGroup, Validators, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { CrearMensajeModel } from 'src/app/models/mensajes/crear-mensaje-model';
import { MensajesService } from 'src/app/services/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
  selector: 'app-nuevo-mensaje',
  templateUrl: './nuevo-mensaje.component.html',
  styleUrls: ['./nuevo-mensaje.component.css']
})
export class NuevoMensajeComponent {
  btnLoading = false;
  isLoading = true;
  showContent = false;
  demoValue: number = 0;
  selectedColor = '#8e1dce'; // Initialize the selected color
  myGroup: FormGroup;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];
  radioValue = 'A';
  disabled = true;
  usuarios = [];
  archivos:NzUploadFile[]=[];
  validateForm!: UntypedFormGroup;
  tipoMensaje = '';
  archivo:any=null;
  obligatorio:any[]=[];
  selectedUserId: any;

  colorChanged() {
    console.log('Selected color:', this.selectedColor);
    // Do something with the selected color
  }

  ngOnInit() {

    this.validateForm = this.fb.group({
      titulo: ['',[Validators.required]],
      tipoMensaje: ['',[Validators.required]],
      fechaCaducidad: ['',[Validators.required]],
      mensaje: ['',[Validators.required]],
      archivo: [''],
      cuentas: [[]],
      //prioridad: ['',[Validators.required]],
      //descripcion: ['',[Validators.required]]
    });

    // Simulate loading time
    this.usuariosService.get()
    .subscribe({
      next:(response)=>{
        console.log(response);
        this.usuarios = response;
        this.isLoading = false;
        this.showContent = true;
      }
    })

    //this.loadData();

    // Initialize the form group
    

   
  }

  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      this.archivo = event.target.files[0];
    }
  }

  tipoMensajeChanged(){
    this.tipoMensaje = this.validateForm.value.tipoMensaje;
  }
  // Upload
  constructor(private msg: NzMessageService, private usuariosService: UsuariosService, private fb: FormBuilder, private mensajesService:MensajesService) {}

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;

    console.log(file.status);

    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.archivos = fileList;
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }

  selectCuentas(userId: any) {
    console.log('Usuario seleccionado:', userId);
    // Aquí puedes agregar la lógica para manejar la selección del usuario
  }
  log(value: string[]): void {
    this.obligatorio = value;
  }

  isDarkMode(): boolean {
    return false;//this.document.body.classList.contains('dark');
  }

  submitForm(){
    if (this.validateForm.valid) {

      let crearMensaje:CrearMensajeModel = 
      {
        titulo: this.validateForm.value.titulo,
        contenido: this.validateForm.value.mensaje,
        tipoMensajeInstitucionalId: this.validateForm.value.tipoMensaje,
        fechaCaducidad: this.validateForm.value.fechaCaducidad,
        obligatorio: this.obligatorio.length > 0,
        file: this.archivo,
        cuentas: this.validateForm.value.cuentas,
      }
      //this.btnLoading = true;
      const formData = new FormData();
      
      if(crearMensaje.cuentas != null){
        crearMensaje.cuentas.forEach(function(str, index) {
          formData.append('Cuentas[' + index + ']', str);
        });
      }
      
      
      formData.append('Contenido',crearMensaje.contenido);
      formData.append('FechaCaducidad', crearMensaje.fechaCaducidad);
      formData.append('File', crearMensaje.file);
      formData.append('Obligatorio', crearMensaje.obligatorio);
      formData.append('TipoMensajeInstitucionalId',crearMensaje.tipoMensajeInstitucionalId.toString());
      formData.append('Titulo',crearMensaje.titulo);

      console.log(formData);
      this.mensajesService.create(formData)
      .subscribe({
        next:(response)=>{
          this.msg.success("Mensaje creado correctamente.");
          this.validateForm.reset();
          this.archivo = null;
        }
      })
      /*
     console.log(this.archivos);
     var archivosList:CrearTicketArchivoRequest[] = [];
     this.archivos.forEach(archivo => {
      if(archivo.status == 'done')
      {
        var archivoRequest:CrearTicketArchivoRequest = {
          nombreFisico : archivo.response[0],
          nombre : archivo.name
        };
        archivosList.push(archivoRequest);
      }
      
      })

      var request: CrearTicketRequest = {
        //id: '',
        areaId: this.validateForm.value.area,
        prioridadId: this.validateForm.value.prioridad,
        titulo: this.validateForm.value.titulo,
        subCategoriaId: this.validateForm.value.subcategoria,
        descripcion:this.validateForm.value.descripcion,
        archivos: archivosList
      };

      
      
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
