import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable/base';
import { MaterialEntregaService } from '../../../services/materialentrega.service';
import { MaterialEntregaModel } from 'src/app/models/material-entrega/material-entrega-model';

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
  btnLoading = false;

  constructor(private msg: NzMessageService, private materialEntregaService: MaterialEntregaService) { }


  registraMateriales() {
    console.log(this.hotRegisterer.getInstance(this.id).getData());
  }

  ngOnInit() {
    // Simulate loading time
    //this.loadData();
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
    setTimeout(() => {

      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    //console.log(this.hotRegisterer.getInstance(this.id).getData());
    var dataGrid = this.hotRegisterer.getInstance(this.id).getData()
    console.log(dataGrid);

    const arrayOfObjects = dataGrid.map(array => {
      const [idSap, nombreMaterial, rangoInicio, rangoTermino, duracion] = array;
      return {
        idSap,
        nombreMaterial,
        rangoInicio,
        rangoTermino,
        duracion
      };
    });

    console.log(arrayOfObjects);

    this.btnLoading = true;
  }

  showNew() {
    this.isVisible = true;
    this.btnLoading = false;

  }


}
