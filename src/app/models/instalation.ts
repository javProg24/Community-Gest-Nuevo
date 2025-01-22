export interface Installation{
    id?: number,
    nombre:string;
    tipo:string;
    capacidad:number;
    descripcion:string,
    dia:string,
    horaInicio:string,
    horaFin:string,
    disponibilidad:string,
}
export class installationResponse{
    id?=0;
    nombre='';
    tipo='';
    capacidad=0;
    descripcion='';
    dia='';
    horaInicio='';
    horaFin='';
    disponibilidad='';
}