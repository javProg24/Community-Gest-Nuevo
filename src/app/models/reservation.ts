import { Installation as Instalacion } from "./instalation";
import { Tool } from "./tool";
import { User as Usuario } from "./user";

export interface Reservation_Install{
    id?: number;
    usuario_ID:number,
    instalacion_ID:number,
    fecha:Date,
    disponibilidad:string
    instalacion?:Instalacion|null
    usuario?:Usuario|null
}
export class reservation_Install_Response{
    id?=0;
    usuario="";
    instalacion="";
    dia=""
    HoraInicio=""
    HoraFin=""
    fecha=new Date();
    disponibilidad=""
}
export interface Reserva_Herr{
    id?: number,
    usuario_ID: number,
    herramienta_ID:number,
    dia:string,
    fecha:Date,
    horaInicio:string,
    horaFin:string,
    disponibilidad:string
    herramienta?:Tool|null
    usuario?:Usuario|null
}
export class reserva_Herra_Response{
    id?=0;
    usuario= "";
    herramienta="";
    dia="";
    fecha=new Date()
    horaInicio="";
    horaFin=""
    disponibilidad=""
}
