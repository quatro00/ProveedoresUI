export class RegistrarCita{
    inicio:string;
    termino:string;
    rielId:string;
    proveedorId:string;
    ordenesCompra:RegistrarCitaOrdenCompra[]=[];
}

export class RegistrarCitaOrdenCompra{
    ordenCompra:string;
    detalle:RegistrarCitaOrdenCompraDetalle[]=[];
}

export class RegistrarCitaOrdenCompraDetalle{
    posicion:string;
    material:string;
    descripcion:string;
    cantidadEntregar:number;
}