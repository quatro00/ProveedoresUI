export interface GetFacturaResultModel{
    id:string;
    docContable:string;
    ordenCompra:string;
    asn:string;
    serie:string;
    fechaFactura:number;
    plazo:number;
    fechaVencimiento:number;
    importeFactura:number;
    importeAPagar:number;
    estatus:number;
    uuid:number;
  }