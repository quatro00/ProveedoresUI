export interface AgendaModel {
  fecha: string;
  bloquesAndenes: BloquesAndene[];
}

export interface BloquesAndene {
  numBloque: number;
  rielId: string;
  name: string;
  start: string;
  end: string;
  color: string;
}