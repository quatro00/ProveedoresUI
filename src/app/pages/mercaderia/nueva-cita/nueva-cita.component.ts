import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CitaOrdenCompra } from 'src/app/models/cita/orden-compra-model';
import { RazonesSociale } from 'src/app/models/usuario/byuser-model';
import { CitasService } from 'src/app/services/citas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { filter } from 'rxjs/operators';
import { RegistrarCita } from 'src/app/models/cita/registrar-cita-model';

@Component({
  selector: 'app-nueva-cita',
  templateUrl: './nueva-cita.component.html',
  styleUrls: ['./nueva-cita.component.css']
})
export class NuevaCitaComponent {
  isLoading = true;
  showContent = false;
  step1Title: string = "Paso 1\ncon salto de línea";
  razonesSociales: RazonesSociale[] = [];
  ordenesCompra: CitaOrdenCompra[] = [];
  entregaMateriales: CitaOrdenCompra[] = [];
  fechaEntregaPaqueteria: string;
  horario: any = null;
  proveedorId: string;
  nuevaCita: RegistrarCita;

  centros:string[]=[];
  centroSeleccionado:string;

  ngOnInit() {
    // Simulate loading time
    this.usuariosService.getByUser()
      .subscribe({
        next: (response) => {
          //console.log(response);
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
  tipoEntregaSeleccionada;

  constructor(
    private modalService: NzModalService,
    private usuariosService: UsuariosService,
    private citasService: CitasService) { }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    if (this.current == 0) {
      if (this.ordenesCompra.length == 0) {
        this.modalService.info({
          nzTitle: '<h2 class="text-dark dark:text-white/[.87]"> Registrar cita</h2>',
          nzContent: '<p class="text-theme-gray dark:text-white/60">Por favor selecciona al menos una orden de compra o un asn.</p>',
          nzOnOk: () => console.log('Info OK')
        });

        return;
      }

      if (this.centros.length > 1) {
        this.modalService.info({
          nzTitle: '<h2 class="text-dark dark:text-white/[.87]"> Registrar cita</h2>',
          nzContent: '<p class="text-theme-gray dark:text-white/60">No puedes agendar ordenes de compra/asns de centros distintos.</p>',
          nzOnOk: () => console.log('Info OK')
        });
        return;
      }
    }

    var entregasPendientes = true;

    if (this.current == 1) {

      if (this.entregaMateriales.length == 0) {
        this.modalService.info({
          nzTitle: '<h2 class="text-dark dark:text-white/[.87]"> Registrar cita</h2>',
          nzContent: '<p class="text-theme-gray dark:text-white/60">Existen ordenes de compra o asns sin entregas de materiales.</p>',
          nzOnOk: () => console.log('Info OK')
        });
        return;
      }

      console.log('Materiales', this.entregaMateriales);
      this.entregaMateriales.forEach((element, index) => {

        if (element.detalle.length == element.detalle.filter(orden => orden.cantidadAEntregar == 0).length) {
          entregasPendientes = false;
        }
      });

      if (!entregasPendientes) {
        this.modalService.info({
          nzTitle: '<h2 class="text-dark dark:text-white/[.87]"> Registrar cita</h2>',
          nzContent: '<p class="text-theme-gray dark:text-white/60">Existen ordenes de compra o asns sin entregas de materiales.</p>',
          nzOnOk: () => console.log('Info OK')
        });
        return;
      }

      if (!this.tipoEntregaSeleccionada) {
        this.modalService.info({
          nzTitle: '<h2 class="text-dark dark:text-white/[.87]"> Registrar cita</h2>',
          nzContent: '<p class="text-theme-gray dark:text-white/60">Debes seleccionar un tipo de entrega.</p>',
          nzOnOk: () => console.log('Info OK')
        });
        return;
      }
    }

    if (this.current == 2) {
      if (this.horario == null && this.tipoEntregaSeleccionada == 'almacen') {
        this.modalService.info({
          nzTitle: '<h2 class="text-dark dark:text-white/[.87]"> Registrar cita</h2>',
          nzContent: '<p class="text-theme-gray dark:text-white/60">Favor de seleccionad un horario de entrega.</p>',
          nzOnOk: () => console.log('Info OK')
        });
        return;
      }


      if (this.tipoEntregaSeleccionada == 'paqueteria') {
        console.log(this.fechaEntregaPaqueteria);

        if (this.fechaEntregaPaqueteria == null) {
          this.modalService.info({
            nzTitle: '<h2 class="text-dark dark:text-white/[.87]"> Registrar cita</h2>',
            nzContent: '<p class="text-theme-gray dark:text-white/60">Favor de seleccionad un dia para la entrega.</p>',
            nzOnOk: () => console.log('Info OK')
          });
          return;
        }
      }
      //return;
    }
    console.log(this.current);
    this.current += 1;
  }

  confirm(): void {

    console.log(this.nuevaCita);
    this.modalService.confirm({
      nzTitle: '<span class="text-dark dark:text-white/[.87]">Confirmación</span>',
      nzContent: '<div class="text-light dark:text-white/60 text-[15px]">¿Los datos de la cita son correctos?</div>',
      nzClassName: 'confirm-modal',
      nzOnOk: () => {
        this.isReviewOrderFinished = true;
        this.showConfirmation = true;
        //console.log('Cita a registrar!', this.nuevaCita);
        if (this.tipoEntregaSeleccionada == 'almacen') {
          this.citasService.crearCitaAlmacen(this.nuevaCita)
            .subscribe({
              next: (response) => {
                console.log(response);
              }
            })
        }

        if (this.tipoEntregaSeleccionada == 'paqueteria') {
          this.citasService.crearCitaPaqueteria(this.nuevaCita)
            .subscribe({
              next: (response) => {
                console.log(response);
              }
            })
        }

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

  proveedorIdSeleccionado(datos: string) {
    this.proveedorId = datos;
  }

  ordenesDeCompraSeleccionadas(datos: CitaOrdenCompra[]) {
    this.ordenesCompra = datos.filter(orden => orden.isActive);
    this.centros = Array.from(new Set(this.ordenesCompra.map(objeto => objeto.centro)));

    if(this.centros.length == 1){
      this.centroSeleccionado = this.centros[0];
    }
    else{
      this.centroSeleccionado == null;
    }
    //console.log('Datos recibidos del hijo:', this.ordenesCompra);
  }

  ordenesDeCompraEntregaMateriales(datos: CitaOrdenCompra[]) {
    this.entregaMateriales = datos.filter(orden => orden.isActive);
    //console.log('Datos recibidos del hijo:', this.ordenesCompra);
  }

  tipoEntrega(datos: string) {
    console.log(datos);
    this.tipoEntregaSeleccionada = datos;
    //this.entregaMateriales = datos.filter(orden => orden.isActive);
    //console.log('Datos recibidos del hijo:', this.ordenesCompra);
  }

  eventoSeleccionado(datos: any) {
    this.horario = datos;
    //console.log('Datos recibidos del hijo:', this.ordenesCompra);
  }

  fechaSeleccionadaPaqueteria(fecha: string) {
    this.fechaEntregaPaqueteria = fecha;
  }
  citaARegistrar(datos: RegistrarCita) {
    this.nuevaCita = datos;
  }
}
