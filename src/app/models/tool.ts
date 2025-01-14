export interface Tool{
    id?:number;
    herramienta:string;
    ubicacion:string;
    descripcion:string;
    cantidad:number;
    estado:string
}
export class toolResponse{
    id?=0;
    herramienta='';
    ubicacion='';
    descripcion='';
    cantidad=0;
    estado=''
}