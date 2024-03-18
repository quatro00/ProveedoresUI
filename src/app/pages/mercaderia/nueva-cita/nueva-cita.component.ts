import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RazonesSociale } from 'src/app/models/usuario/byuser-model';
import { CitasService } from 'src/app/services/citas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-nueva-cita',
  templateUrl: './nueva-cita.component.html',
  styleUrls: ['./nueva-cita.component.css']
})
export class NuevaCitaComponent {
  isLoading = true;
  showContent = false;
  step1Title: string = "Paso 1\ncon salto de línea";
  razonesSociales:RazonesSociale[]=[];

  ngOnInit() {
    // Simulate loading time
    this.usuariosService.getByUser()
    .subscribe({
      next:(response)=>{
        console.log(response);
        this.razonesSociales = response.razonesSociales;
        this.loadData();
        //this.isVisible = false;
        //this.btnLoading = false;
      }
    })
    //this.loadData();
  }
  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }

  //Step
  current = 0;
  showConfirmation = false;
  isReviewOrderFinished = false;

  constructor(
    private modalService: NzModalService, 
    private usuariosService: UsuariosService,
    private citasService: CitasService) {}

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  confirm(): void {
    this.modalService.confirm({
      nzTitle: '<span class="text-dark dark:text-white/[.87]">Confirmación</span>',
      nzContent: '<div class="text-light dark:text-white/60 text-[15px]">¿Los datos de la cita son correctos?</div>',
      nzClassName: 'confirm-modal',
      nzOnOk: () => {
        this.isReviewOrderFinished = true;
        this.showConfirmation = true;
      }
    });
  }

  getStatus(stepIndex: number): string {
    if (this.current > stepIndex) {
      return 'finish';
    } else if (this.current === stepIndex) {
      return 'process';
    } else {
      return 'wait';
    }
  }
}
