import { Component, Input, Output,EventEmitter } from '@angular/core';
import { BloquesAndene } from 'src/app/models/cita/agenda-model';
import { CitaOrdenCompra } from 'src/app/models/cita/orden-compra-model';
import { RegistrarCita, RegistrarCitaOrdenCompra, RegistrarCitaOrdenCompraDetalle } from 'src/app/models/cita/registrar-cita-model';

@Component({
  selector: 'confirmacion',
  template: `
<div>
  <h4 class="text-[20px] font-medium mb-[20px] text-dark dark:text-white/[.87]">4. Confirmacion de la cita</h4>
    <label class="review text-light dark:text-white/60 font-normal text-[14px]" nz-checkbox [(ngModel)]="checked">I Agree With The Terms And Conditions.</label>
</div>
`,
styles: [`
  :host ::ng-deep .review .ant-checkbox-checked::after,
  :host ::ng-deep .review .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  :host ::ng-deep .review .ant-checkbox:hover .ant-checkbox-inner,
  :host ::ng-deep .review .ant-checkbox-input:focus + .ant-checkbox-inner{
    @apply border-success;
  }
  :host ::ng-deep .review .ant-checkbox-checked .ant-checkbox-inner{
    @apply bg-success border-success;
  }
`]
})

export class ConfirmacionComponent {
  @Input() ordenesCompra:CitaOrdenCompra[]=[];
  @Input() horario:BloquesAndene;
  @Input() proveedorId:string;
  @Output() enviarDatos = new EventEmitter<RegistrarCita>();

  registrarCita:RegistrarCita;
  checked = false;

  ngOnInit(): void {

    this.registrarCita ={
      inicio: this.horario.start,
      termino: this.horario.end,
      rielId: this.horario.rielId,
      proveedorId: this.proveedorId,
      ordenesCompra: []
    }

    this.ordenesCompra.forEach(element => {



      var citaOrdenCompra:RegistrarCitaOrdenCompra={
        ordenCompra: element.ordenCompra,
        detalle:[]
      }
      element.detalle.forEach(det => {
        if(det.cantidadAEntregar ?? 0 > 0){
          citaOrdenCompra.detalle.push({
            posicion: det.posicion,
            material: det.material,
            descripcion: det.descripcion,
            cantidadEntregar: det.cantidadAEntregar
          });
        }
      });

      this.registrarCita.ordenesCompra.push(citaOrdenCompra);
    });
    console.log('ordenes de compra:', this.ordenesCompra);
    console.log('horario:', this.horario);
    console.log('crear orden:', this.registrarCita);
    this.enviarDatos.emit(this.registrarCita);
   }
}
