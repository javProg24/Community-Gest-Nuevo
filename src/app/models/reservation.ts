export interface Reservation_Install{
    id?: number;
    id_usuario:number,
    id_instalacion:number,
    fecha:Date,
    disponibilidad:string
}
export class reservation_Install_Response{
    id?=0;
    id_usuario=0;
    id_instalacion=0;
    fecha=new Date();
    disponibilidad=""
}
export interface Reserva_Herr{
    id?: number,
    id_usuario: number,
    dia:string,
    fecha:Date,
    hora_Inicio:string,
    hora_Fin:string,
    disponibilidad:string
}
export class reserva_Herra_Response{
    id?=0;
    id_usuario= 0;
    dia="";
    fecha=new Date()
    hora_Inicio="";
    hora_Fin=""
    disponibilidad=""
}
