export interface RielModel {
    id?: string;
    centroId: string;
    centro?: string;
    codigo:string;
    riel: string;
    activo: boolean;
    horarios:horarioModel[];
  }

  export interface horarioModel{
    id:string;
    rielId:string;
    dia:number;
    activo:boolean;
    horaDesde:string;
    horaHasta:string;
  }

  export interface grupoDeArticuloModel{
    rielId:string;
    grupoMateriales:any[];
  }

  export interface grupoDeArticuloDetModel{
    sapId:string;
    descripcion:string;
  }
