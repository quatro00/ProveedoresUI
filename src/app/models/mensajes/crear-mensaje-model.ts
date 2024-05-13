export interface CrearMensajeModel {
    titulo: string;
    //autor: string;
    contenido: string;
    tipoMensajeInstitucionalId: number;
    fechaCaducidad: string;
    obligatorio: any;
    file: any;
    cuentas: string[];
  }