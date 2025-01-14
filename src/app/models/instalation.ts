export interface Installation{
    id?: number,
    instalacion:string;
    tipo:string;
    capacidad:number;
    descripcion:string,
    dia:string,
    hora_Inicio:string,
    hora_Fin:string,
    activo:string,
}
export class installationResponse{
    id?=0;
    instalacion='';
    tipo='';
    capacidad=0;
    descripcion='';
    dia='';
    hora_Inicio='';
    hora_Fin='';
    activo='';
}