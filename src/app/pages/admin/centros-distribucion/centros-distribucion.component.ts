
import { Component, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { CentroModel } from 'src/app/models/centro/centro-model';
import { CentrosService } from 'src/app/services/centros.service';
import { RielModel } from '../../../models/riel/riel-model';
import { RielService } from '../../../services/riel.service';
import { HotTableRegisterer } from '@handsontable/angular';
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
  btnLoading_GrupoArticulo=false;
  rielSelected:string='';
  isCheckedRiel=false;
  rielActivo = true;
  btnLoadingRiel = false;
  btnLoading = false;
  isVisible = false;
  isVisibleRieles = false;
  isVisibleGruposArticulo = false;
  isLoading = true;
  showContent = false;
  centros:CentroModel[] = [];
  filteredData: CentroModel[] = [];
  filteredData_Riel: RielModel[] = [];
  data: any[] = [
    ['']
  ];
  validateForm!: UntypedFormGroup;
  rielForm!: UntypedFormGroup;

  centroId:string;
  isChecked:boolean;
  
  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';

   // Upload
   constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,   
    private msg: NzMessageService, 
    private centrosService:CentrosService,
    private rielService:RielService) {}


  ngOnInit() {
    this.validateForm = this.fb.group({
      idSap: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      activo: [''],
    });

    this.rielForm = this.fb.group({
      codigo: ['',[Validators.required]],
      nombre: ['',[Validators.required]],

      lunesInicio: ['',[Validators.required]],
      martesInicio: ['',[Validators.required]],
      miercolesInicio: ['',[Validators.required]],
      juevesInicio: ['',[Validators.required]],
      viernesInicio: ['',[Validators.required]],
      sabadoInicio: ['',[Validators.required]],
      domingoInicio: ['',[Validators.required]],

      lunesTermino: ['',[Validators.required]],
      martesTermino: ['',[Validators.required]],
      miercolesTermino: ['',[Validators.required]],
      juevesTermino: ['',[Validators.required]],
      viernesTermino: ['',[Validators.required]],
      sabadoTermino: ['',[Validators.required]],
      domingoTermino: ['',[Validators.required]],


      activo: [''],
    });

    this.loadData();
    
  }

  loadData(){
    this.centrosService.getAll()
    .subscribe({
      next:(response)=>{
        //console.log(response);
        this.centros = response;
        this.filteredData = response;

        this.isLoading = false;
        this.showContent = true;
      }})
  }

  guardarRiel(){
    //console.log(this.validateForm);
    //
    if (this.rielForm.valid) {
      this.btnLoadingRiel = true;
      //console.log(this.validateForm);
      var riel:RielModel = {
        codigo: this.rielForm.value.codigo,
        centroId: this.centroId,
        riel: this.rielForm.value.nombre,
        activo: this.isCheckedRiel,
        horarios:[
          { id:'', rielId:'', dia:1, activo:true, horaDesde: this.rielForm.value.lunesInicio, horaHasta: this.rielForm.value.lunesTermino,},
          { id:'', rielId:'', dia:2, activo:true, horaDesde: this.rielForm.value.martesInicio, horaHasta: this.rielForm.value.martesTermino,},
          { id:'', rielId:'', dia:3, activo:true, horaDesde: this.rielForm.value.miercolesInicio, horaHasta: this.rielForm.value.miercolesTermino,},
          { id:'', rielId:'', dia:4, activo:true, horaDesde: this.rielForm.value.juevesInicio, horaHasta: this.rielForm.value.juevesTermino,},
          { id:'', rielId:'', dia:5, activo:true, horaDesde: this.rielForm.value.viernesInicio, horaHasta: this.rielForm.value.viernesTermino,},
          { id:'', rielId:'', dia:6, activo:true, horaDesde: this.rielForm.value.sabadoInicio, horaHasta: this.rielForm.value.sabadoTermino,},
          { id:'', rielId:'', dia:7, activo:true, horaDesde: this.rielForm.value.domingoInicio, horaHasta: this.rielForm.value.domingoTermino,},
        ]
      }

  
      
      this.btnLoading = true;
      this.rielService.create(riel)
      .subscribe({
        next:(response)=>{
          this.btnLoadingRiel = false;
          this.modalService.closeAll();
          this.rielForm.reset();
          this.loadData();
        }
      })
      
      
    } else {
      Object.values(this.rielForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel(){
    this.isVisible = false;
    this.isVisibleRieles = false;
    
  }

  handleCancel_GruposArticulo(){
    this.isVisibleGruposArticulo = false;
  }
  showRieles(newItem: TemplateRef<{}>, model:any) {
    this.rielService.getByCentro(model.id)
    .subscribe({
      next:(response)=>{
        console.log(response);
        this.filteredData_Riel = response;
        this.centroId = model.id;
        this.btnLoadingRiel = false;
        this.isVisibleRieles = true;
      }})
  }

  showGruposArticulo(newItem: TemplateRef<{}>, model:any) {
    this.btnLoading_GrupoArticulo = false;
    this.isVisibleGruposArticulo = true;
    this.rielSelected = model;
    /*
    this.rielService.getByCentro(model.id)
    .subscribe({
      next:(response)=>{
        console.log(response);
        this.filteredData_Riel = response;
        this.centroId = model.id;
        this.btnLoadingRiel = false;
        this.isVisibleRieles = true;
      }})
      */
  }

  handleOk_GrupoArticulo(){
    this.btnLoading_GrupoArticulo= true;
    var dataGrid = this.hotRegisterer.getInstance(this.id).getData();
   console.log(dataGrid);
  }

  handleOk(){

    if(this.centroId == null){
      this.submitForm();
    }
    else{
      this.submitUpdForm(this.centroId);
    }
    
  }
  showNew(newItem: TemplateRef<{}>) {
    this.centroId = null;
    this.isChecked = false;
    this.btnLoading = false;
    this.validateForm.reset();

    this.isVisible = true;
    return;
    const modal = this.modalService.create({
        nzTitle: 'Crear centro',
        nzContent: newItem,
        nzFooter: [
            {
                isLoading:true,
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
    this.centroId = model.id;
    this.isChecked = model.activo;
    this.btnLoading = false;
    this.validateForm.setValue({
        idSap : model.idSap,
        descripcion : model.descripcion,
        activo:0
    })

    this.isVisible = true;
    /*
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
    */
  }

  log(value: string[]): void {
    //console.log(value);
    if(value.length == 0){
      this.isChecked = false;
    }
    else{
      this.isChecked = true;
    }
  }

  logRiel(value: string[]): void {
    //console.log(value);
    if(value.length == 0){
      this.isCheckedRiel = false;
    }
    else{
      this.isCheckedRiel = true;
    }
  }

  submitForm(): void {
    //console.log(this.validateForm.valid);
    if (this.validateForm.valid) {
      var request:CentroModel = {
        idSap: this.validateForm.value.idSap,
        descripcion: this.validateForm.value.descripcion,
        activo: this.isChecked,
      };
      
      //console.log(request);

      this.btnLoading = true;
      this.centrosService.create(request)
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

  submitUpdForm(id:string): void {
    //console.log(this.validateForm);
    if (this.validateForm.valid) {
      //console.log(this.validateForm);
      
      
      var request:CentroModel = {
        idSap: this.validateForm.value.idSap,
        descripcion: this.validateForm.value.descripcion,
        activo: this.isChecked,
      };
      
      this.btnLoading = true;
      this.centrosService.update(id, request)
      .subscribe({
        next:(response)=>{
          this.btnLoading = false;
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
