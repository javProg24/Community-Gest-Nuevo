export interface Timetable{
    id?:number,
    dia:string,
    hora_Inicio:string,
    hora_Fin:string,
    activo:string,
    instalacion_ID:number,
    nombre_Instalacion?:string
}
export class TimetableResponse{
    id?=0;
    dia='';
    hora_Inicio='';
    hora_Fin='';
    activo='';
    instalacion_ID = 0;
  nombre_Instalacion = '';
}