import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable/base';
import { MaterialEntregaService } from '../../../services/materialentrega.service';
import { MaterialEntregaModel } from 'src/app/models/material-entrega/material-entrega-model';
import { MaterialEntregaTiempoRequestModel } from 'src/app/models/material-entrega/material-tiempo-request-model';
import { CentrosService } from '../../../services/centros.service';

@Component({
  styles: [`
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
    :host ::ng-deep nz-switch .ant-switch{
      @apply bg-normal dark:bg-white/10;
    }
    :host ::ng-deep nz-switch .ant-switch.ant-switch-checked{
      @apply bg-primary;
    }

  `],
  selector: 'app-administracion-materiales',
  templateUrl: './administracion-materiales.component.html',
  styleUrls: ['./administracion-materiales.component.css']
})
export class AdministracionMaterialesComponent {

  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';

  filteredData_Asignacion:any[]=[];
  materiales: MaterialEntregaModel[] = [];
  filteredData: MaterialEntregaModel[] = [];
  contactSearchValue = '';
  //MaterialPendienteModel  
  data_MaterilPendiente: any[] = [];
  material:any;
  nombreMaterial:any;

  data: any[] = [
    ['']
  ];

  hotSettings: Handsontable.GridSettings = {
    minRows: 1,
    rowHeaders: true,
    colHeaders: true,
    stretchH: 'all'
  };

  dataset: any[] = [

  ];

  isLoading = true;
  showContent = false;
  isVisible = false;
  isVisibleMateriales = false;
  isVisibleAsignarRieles = false;
  btnLoading = false;
  btnLoadingAsignarRieles = false;

  constructor(
    private msg: NzMessageService, 
    private materialEntregaService: MaterialEntregaService,
    private centrosService: CentrosService) { }


  handleOk_AsignarRieles(){
   this.btnLoadingAsignarRieles = true;
   let asignacionMaterial = {
    material:this.material,
    nombreMaterial: this.nombreMaterial,
    detalle: this.filteredData_Asignacion
   }
   console.log(asignacionMaterial); 

   this.materialEntregaService.InsRielMaterialEntrega(asignacionMaterial)
   .subscribe({
     next:(response)=>{
       this.isVisibleAsignarRieles = false;
       this.btnLoadingAsignarRieles = false;
     },
     error:()=>{
      this.isVisibleAsignarRieles = false;
      this.btnLoadingAsignarRieles = false;
     },
     complete:()=>{
      this.isVisibleAsignarRieles = false;
      this.btnLoadingAsignarRieles = false;
     }
   })

  }
  registraMateriales() {
    console.log(this.hotRegisterer.getInstance(this.id).getData());
  }

  ngOnInit() {
    // Simulate loading time
    //this.loadData();
    this.materialEntregaService.getMaterialesPendientes()
    .subscribe({
      next: (response) => {
        console.log(response);
        this.data_MaterilPendiente = response;
      }
    })

    this.materialEntregaService.getAll()
      .subscribe({
        next: (response) => {
          this.materiales = response;
          this.filteredData = response;
          this.isLoading = false;
          this.showContent = true;
        }
      })
  }

  private applyFilters(): any[] {
      
    return this.materiales.filter((data2) =>
      data2.centro.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.sapId.toLowerCase().includes(this.contactSearchValue.toLowerCase()) ||
      data2.nombreMaterial.toLowerCase().includes(this.contactSearchValue.toLowerCase())
    );
  }

  //metodos para la forma
  filterItems(): void {
    this.filteredData = this.applyFilters();
  }
  
  muestraAsignarRieles(item:any){
    console.log(item);
    this.materialEntregaService.GetRielMaterialEntrega(item.sapId, item.centro)
    .subscribe({
      next: (response) => {
        this.filteredData_Asignacion = response;
        this.isVisibleAsignarRieles = true;
        this.material = item.sapId;
        this.nombreMaterial = item.nombreMaterial;
        console.log(response);
      }
    })
  }
  loadData() {
    // Simulate an asynchronous data loading operation
    this.materialEntregaService.getAll()
    .subscribe({
      next: (response) => {
        this.materiales = response;
        this.filteredData = response;
      }
    })
  }

  handleCancel() {
    this.isVisible = false;
    this.isVisibleMateriales = false;
    this.isVisibleAsignarRieles = false;
  }

  handleOk_materiales(){
    this.isVisibleMateriales = false;
  }

  handleOk() {
    //console.log(this.hotRegisterer.getInstance(this.id).getData());
    this.btnLoading = true;
    var dataGrid = this.hotRegisterer.getInstance(this.id).getData();
    

    const arrayOfObjects:MaterialEntregaTiempoRequestModel[] = dataGrid.map(array => {
      const [centro,idSap, nombreMaterial, rangoInicio, rangoTermino, duracion] = array;
      return {
        centro,
        idSap,
        nombreMaterial,
        rangoInicio,
        rangoTermino,
        duracion
      };
    });

    console.log(arrayOfObjects);

    this.materialEntregaService.create(arrayOfObjects)
      .subscribe({
        next:(response)=>{
          this.loadData();
          this.isVisible = false;
          this.btnLoading = false;
        }
      })

   
  }

  showNew() {
    //this.hotRegisterer.getInstance(this.id).loadData([]);
    this.isVisible = true;
    this.btnLoading = false;

  }

  showNewMaterialesPendientes(){
    //this.hotRegisterer.getInstance(this.id).loadData([]);
    this.isVisibleMateriales = true;
    //this.btnLoading = false;
  }
}
