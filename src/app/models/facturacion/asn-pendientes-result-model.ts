export interface AsnPendientesModel {
    ordenCompra: string;
    asn: string;
    fechaRecepcion: string;
    piezasRecibidas: number;
    importeAPagar:number;
    subTotal:number;
    xml?:string;
    pdf?:string;
    detalle:AsnPendientesDetalleModel[];
  }

  export interface AsnPendientesDetalleModel{
    material:string;
    posicion:string;
    departamento:string;
    sku:string;
    descripcion:string;
    cantidadSolicitada:number;
    cantidadRecibida:number;
    precioUnitario:number;
    subTotal:number;
    importe:number;
  }