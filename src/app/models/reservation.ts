import { Instalacion as Instalacion } from "./instalation";
import { Herramienta } from "./tool";
import { Usuario as Usuario } from "./user";

export interface Reserva_Instalacion{
    id?: number;
    usuario_ID:number,
    usuario?:Usuario|null
    instalacion_ID:number,
    instalacion?:Instalacion|null
    fecha:string,
    disponibilidad:string
}
export class Reserva_Instalacion_Response{
    id?=0;
    usuario="";
    instalacion="";
    dia=""
    horaInicio=""
    horaFin=""
    fecha="";
    disponibilidad=""
}
export interface Reserva_Herr{
    id?: number,
    usuario_ID: number,
    herramienta_ID:number,
    dia:string,
    fecha:string,
    horaInicio:string,
    horaFin:string,
    disponibilidad:string
    herramienta?:Herramienta|null
    usuario?:Usuario|null
}
export class reserva_Herra_Response{
    id?=0;
    usuario= "";
    herramienta="";
    dia="";
    fecha=""
    horaInicio="";
    horaFin=""
    disponibilidad=""
}
