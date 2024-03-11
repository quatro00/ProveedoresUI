export interface MensajeModel {
  id: string;
  titulo: string;
  autor: string;
  contenido: string;
  tipoMensajeInstitucionalId: number;
  tipoMensajeInstitucional: string;
  fechaPublicacion: string;
  fechaCaducidad: string;
  leido: boolean;
  obligatorio: boolean;
}