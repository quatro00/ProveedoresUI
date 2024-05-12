import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { GetFacturaResultModel } from 'src/app/models/facturacion/get-factura-result-model';
import { RazonesSociale } from 'src/app/models/usuario/byuser-model';
import { FacturacionService } from 'src/app/services/facturacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-reporte-facturas',
  templateUrl: './reporte-facturas.component.html',
  styleUrls: ['./reporte-facturas.component.css']
})
export class ReporteFacturasComponent {

  isVisible = false;
  isLoading = true;
  showContent = false;
  validateForm!: UntypedFormGroup;
  validateFormFactura!: UntypedFormGroup;
  razonesSociales: RazonesSociale[] = [];
  razonSocial:RazonesSociale;
  facturas: GetFacturaResultModel[] = [];
  btnLoading = false;

  handleCancel() {
    this.isVisible = false;
  }

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }

  ngOnInit() {
    this.validateFormFactura = this.fb.group({
      sociedad: [null, [Validators.required]],
      xml: [null, [Validators.required]],
      pdf: [null, [Validators.required]],
    });

    this.validateForm = this.fb.group({
      razonSocial: [null, [Validators.required]],
      fecha: [null, [Validators.required]],
      ordenCompra: [null],
      asn: [null]
    });

    this.usuariosService.getByUser()
      .subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading = false;
          this.showContent = true;
          this.razonesSociales = response.razonesSociales;
          this.loadData();
          //this.isVisible = false;
          //this.btnLoading = false;
        }
      })
  }

  submitForm(): void {

    if (this.validateForm.valid) {
      this.btnLoading = true;
      this.razonSocial = this.razonesSociales.find(x => x.id === this.validateForm.value.razonSocial);
      //console.log(desde,hasta);
      this.facturacionService.getFacturas(this.validateForm.value.razonSocial, this.validateForm.value.fecha)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.facturas = response;
            this.btnLoading = false;
            //this.ordenesCompra=response;
            //this.razonesSociales = response.razonesSociales;
          },
          complete: () => {
            this.btnLoading = false;
          },
          error:() =>{
            this.btnLoading = false;
          }
        })





      //this.citasService.getOrdenesDeCompraAgendar()
      //console.log('submit!', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({
            onlySelf: true
          });
        }
      });
    }
  }

  constructor(
    private usuariosService: UsuariosService,
    private facturacionService: FacturacionService,
    private fb: UntypedFormBuilder,
  ) { }
}
