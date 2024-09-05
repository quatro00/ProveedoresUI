import { Component, Input, Output,EventEmitter } from '@angular/core';
import { BloquesAndene } from 'src/app/models/cita/agenda-model';
import { CitaOrdenCompra } from 'src/app/models/cita/orden-compra-model';
import { RegistrarCita, RegistrarCitaOrdenCompra, RegistrarCitaOrdenCompraDetalle } from 'src/app/models/cita/registrar-cita-model';

@Component({
  selector: 'confirmacion',
  template: `
<div>
  <h4 class="text-[20px] font-medium mb-[20px] text-dark dark:text-white/[.87]">4. Confirmacion de la cita</h4>
  

  <table style="width: 100%; font-size: 18px;">
  <tr>
    <td colspan="4">
    <h3 class="text-[20px] font-medium mb-[20px] text-dark dark:text-white/[.87]" style="text-align: center;">Datos del proveedor</h3>
    </td>
  </tr>
  <tr>
      <td>
        <b>Nombre</b>
      </td>
      <td>
        Levi straus
      </td>

      <td>
       <b>Numero de proveedor</b>
      </td>
      <td>
        0005125
      </td>
    </tr>

    <tr>
    <td colspan="4">
    <h3 class="text-[20px] font-medium mb-[20px] text-dark dark:text-white/[.87]" style="text-align: center;">Datos generales</h3>
    </td>
  </tr>

    <tr>
      <td>
        <b>Tipo de entrega</b>
      </td>
      <td>
        Almacen
      </td>

      <td>
        <b>Centro de distribucion</b>
      </td>
      <td>
       Irapuato
      </td>
    </tr>

    <tr>
      <td>
        <b>Fecha de la cita</b>
      </td>
      <td>
        15/01/2024
      </td>

      <td>
        <b>Tiempo estimado</b>
      </td>
      <td>
       100 min.
      </td>
    </tr>
    <tr>
      <td>
        <b>Ordenes de compra</b>
      </td>
      <td>
        1,2,3,4
      </td>

      <td>
        <b>Asns</b>
      </td>
      <td>
       4,5,6
      </td>
    </tr>

    <tr>
      <td>
        Total de piezas
      </td>
      <td>
        100
      </td>

     
    </tr>
  </table>
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
  @Input() centro:string;

  @Input() tipoEntrega:string;
  @Input() fechaPaqueteria:string;

  @Output() enviarDatos = new EventEmitter<RegistrarCita>();

  registrarCita:RegistrarCita;
  checked = false;

  ngOnInit(): void {

    console.log(this.ordenesCompra);

    if(this.tipoEntrega == 'almacen'){
      this.registrarCita ={
        inicio: this.horario.start,
        termino: this.horario.end,
        rielId: this.horario.rielId,
        proveedorId: this.proveedorId,
        ordenesCompra: []
      }
    }

    if(this.tipoEntrega == 'paqueteria'){
      this.registrarCita ={
        inicio: this.fechaPaqueteria,
        termino: this.fechaPaqueteria,
        //rielId: this.horario.rielId,
        proveedorId: this.proveedorId,
        centro:this.centro,
        ordenesCompra: []
      }
    }
    

    this.ordenesCompra.forEach(element => {



      var citaOrdenCompra:RegistrarCitaOrdenCompra={
        ordenCompra: element.ordenCompra,
        tipo:element.tipo,
        asn:element.asn,
        departamento:element.departamento,
        detalle:[]
      }
      element.detalle.forEach(det => {
        if(det.cantidadAEntregar ?? 0 > 0){
          citaOrdenCompra.detalle.push({
            posicion: det.posicion,
            material: det.material,
            descripcion: det.descripcion,
            cantidadEntregar: det.cantidadAEntregar,
            unidadMedida: det.unidadMedida,
            precio: det.precio
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
