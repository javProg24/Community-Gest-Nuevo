export interface Reporte{
    id?: number,
    titulo: string,
    descripcion: string,
    recursoAfectado?: string, 
    estado: boolean,
}
export class reporteResponse{
    id?=0;
    titulo = '';
    descripcion = '';
    recursoAfectado = '';
    estado = false;
}