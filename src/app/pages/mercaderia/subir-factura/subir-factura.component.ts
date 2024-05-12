import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AsnPendientesDetalleModel, AsnPendientesModel } from 'src/app/models/facturacion/asn-pendientes-result-model';
import { RazonesSociale, Sociedade } from 'src/app/models/usuario/byuser-model';
import { FacturacionService } from 'src/app/services/facturacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-subir-factura',
  templateUrl: './subir-factura.component.html',
  styleUrls: ['./subir-factura.component.css']
})
export class SubirFacturaComponent {

  sociedades:Sociedade[]=[];
  razonSocial:RazonesSociale;
  razonesSociales: RazonesSociale[] = [];
  validateForm!: UntypedFormGroup;
  validateFormFactura!: UntypedFormGroup;
  btnLoading = false;
  isLoading = true;
  isLoadingMdl = true;
  showContent = false;
  facturas: AsnPendientesModel[] = [];
  isVisible = false;
  pdf:any=null;
  xml:any=null;
  asnSelected:AsnPendientesModel;

  data: any[] = [
    ['']
  ];

  ngOnInit() {
    this.isLoading = false;
    this.isLoadingMdl = false;
    this.showContent = true;

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

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      
    }, 500);
  }


  submitForm(): void {

    if (this.validateForm.valid) {
      this.btnLoading = true;
      this.razonSocial = this.razonesSociales.find(x => x.id === this.validateForm.value.razonSocial);
      //console.log(desde,hasta);
      this.facturacionService.getAsnsPendientes(this.validateForm.value.razonSocial, this.validateForm.value.fecha)
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

  onFileSelectPdf(event): void {
    if (event.target.files.length > 0) {
      this.pdf = event.target.files[0];
      console.log(event.target.files[0]);
      /*
      const formData = new FormData();
      formData.append('pdfFile', event.target.files[0]); // Asegúrate de que el nombre del archivo coincida con el esperado en el lado del servidor
      formData.append('xmlFile', event.target.files[1]); // Asegúrate de que el nombre del archivo coincida con el esperado en el lado del servidor
      formData.append('param1', 'valor1');
      formData.append('param2', 'valor2');
      formData.append('param3', 'valor3');
      */
    }
  }

  onFileSelectXml(event): void {
    if (event.target.files.length > 0) {
      this.xml =event.target.files[0];
      console.log(event.target.files[0]);
      /*
      const formData = new FormData();
      formData.append('pdfFile', event.target.files[0]); // Asegúrate de que el nombre del archivo coincida con el esperado en el lado del servidor
      formData.append('xmlFile', event.target.files[1]); // Asegúrate de que el nombre del archivo coincida con el esperado en el lado del servidor
      formData.append('param1', 'valor1');
      formData.append('param2', 'valor2');
      formData.append('param3', 'valor3');
      */
    }
  }

  abrirDetalle(item:AsnPendientesModel){
    this.asnSelected = item;
    this.sociedades = this.razonSocial.sociedades;
    this.isVisible = true;
    this.data = item.detalle;
  }
  handleCancel() {
    this.isVisible = false;
  }

  handleOk(){
    const formData = new FormData();
    this.isLoadingMdl = true;

    formData.append('PdfFile',this.pdf);
    formData.append('XmlFile', this.xml);
    formData.append('ordenCompra', this.asnSelected.ordenCompra);
    formData.append('asn', this.asnSelected.asn);
    formData.append('proveedorId', this.razonSocial.id);
    formData.append('sociedad', this.validateFormFactura.value.sociedad);

    this.facturacionService.uploadFactura(formData)
    .subscribe({
      next: (response) => {
        this.isVisible = false;
        this.isLoadingMdl = false;
        this.submitForm();
      },
      complete:()=>{
        this.isLoadingMdl = false;
      },
      error:()=>{
        this.isLoadingMdl = false;
      }
    })
    console.log(formData);
  }
  constructor(
    private usuariosService: UsuariosService,
    private facturacionService: FacturacionService,
    private fb: UntypedFormBuilder,
  ) { }
}
