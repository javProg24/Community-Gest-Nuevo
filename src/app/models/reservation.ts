import { Installation } from "./instalation";
import { Tool } from "./tool";
import { User } from "./user";

export interface Reservation_Install{
    id?: number;
    usuario_ID:number,
    instalacion_ID:number,
    fecha:Date,
    disponibilidad:string
    instalacion?:Installation|null
    usuario?:User|null
}
export class reservation_Install_Response{
    id?=0;
    usuario="";
    nombre_Instalacion="";
    dia=""
    Hora_Inicio=""
    Hora_Fin=""
    fecha=new Date();
    disponibilidad=""
}
export interface Reserva_Herr{
    id?: number,
    usuario_ID: number,
    herramienta_ID:number,
    dia:string,
    fecha:Date,
    hora_Inicio:string,
    hora_Fin:string,
    disponibilidad:string
    herramienta?:Tool|null
    usuario?:User|null
}
export class reserva_Herra_Response{
    id?=0;
    usuario= "";
    herramienta="";
    dia="";
    fecha=new Date()
    hora_Inicio="";
    hora_Fin=""
    disponibilidad=""
}
