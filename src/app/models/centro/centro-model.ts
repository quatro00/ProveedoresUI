export interface CentroModel {
    id?: string;
    idSap: string;
    descripcion: string;
    rieles?:CentroRielModel[];
    activo: boolean;

  }

  export interface CentroRielModel{
    id:string;
    riel:string;
  }