export interface Installation{
    id?: number,
    nombre:string;
    tipo:string;
    capacidad:number;
    descripcion:string,
    dia:string,
    hora_Inicio:string,
    hora_Fin:string,
    disponibilidad:string,
}
export class installationResponse{
    id?=0;
    nombre='';
    tipo='';
    capacidad=0;
    descripcion='';
    dia='';
    hora_Inicio='';
    hora_Fin='';
    disponibilidad='';
}