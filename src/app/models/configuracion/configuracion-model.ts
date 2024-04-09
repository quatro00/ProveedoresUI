export interface ConfiguracionModel {
    id:number;
    descripcion:string;
    modulo:string;
    codigo:string;
    valorEntero?: string;  
    valorDecimal?: string;
    valorString?: string;
    valorDate?: string;
}