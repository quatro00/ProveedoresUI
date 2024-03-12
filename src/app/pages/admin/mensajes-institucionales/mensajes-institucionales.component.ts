
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { MensajeModel } from 'src/app/models/mensajes/mensaje-model';
import { MensajesService } from 'src/app/services/mensajes.service';

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
  selector: 'app-mensajes-institucionales',
  templateUrl: './mensajes-institucionales.component.html',
  styleUrls: ['./mensajes-institucionales.component.css']
})
export class MensajesInstitucionalesComponent {
  isLoading = true;
  showContent = false;
  myGroup: FormGroup;
  listOfOption: Array<{ label: string; value: string }> = [];
  mensajes:MensajeModel[] = [];
  filteredData: any[] = [];
  disabled = true;

 
  listOfCurrentPageData: readonly any[] = [];
  listOfData: readonly any[] = [];


  ngOnInit() {
    // Simulate loading time
    this.loadData();

    // Initialize the form group
   
    // Initialize the list of options
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }

  loadData() {
    // Simulate an asynchronous data loading operation

    this.mensajesService.getAll()
      .subscribe({
        next:(response)=>{
          this.mensajes = response;
          this.filteredData = response;

          this.isLoading = false;
          this.showContent = true;
        }
      })
  }

  // Upload
  constructor(
    private msg: NzMessageService,
    private mensajesService: MensajesService,
    private router: Router, 
    ) {}


    nuevoMensaje() {
      this.router.navigateByUrl(`administrador/mensajes-institucionales/nuevo-mensaje`); 
    }


  log(value: string[]): void {
    if(value.length === 0) {
      this.filteredData = this.mensajes;
    }
    else{
      this.filteredData = this.mensajes.filter(mensaje => value.includes(mensaje.tipoMensajeInstitucional));
    }
  }

 
}
