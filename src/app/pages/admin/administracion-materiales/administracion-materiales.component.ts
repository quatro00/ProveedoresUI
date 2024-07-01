import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable/base';
import { MaterialEntregaService } from '../../../services/materialentrega.service';
import { MaterialEntregaModel } from 'src/app/models/material-entrega/material-entrega-model';
import { MaterialEntregaTiempoRequestModel } from 'src/app/models/material-entrega/material-tiempo-request-model';

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
  `],
  selector: 'app-administracion-materiales',
  templateUrl: './administracion-materiales.component.html',
  styleUrls: ['./administracion-materiales.component.css']
})
export class AdministracionMaterialesComponent {

  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';

  materiales: MaterialEntregaModel[] = [];
  filteredData: MaterialEntregaModel[] = [];

  //MaterialPendienteModel
  data_MaterilPendiente: any[] = [];

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
  btnLoading = false;

  constructor(private msg: NzMessageService, private materialEntregaService: MaterialEntregaService) { }


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
