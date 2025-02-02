import { InstalacionResponse } from "./instalation";
import { reporteResponse } from "./report";
import { reserva_Herra_Response, Reserva_Instalacion_Response } from "./reservation";
import { TimetableResponse } from "./timetable";
import { HerramientaResponse } from "./tool";
import { usuarioResponse } from "./user";

export interface Accion<T = any> {
    accion:string;
    fila?:T;
}
const entityMap:{[key: string]:any}={
    'install':InstalacionResponse,
    'user':usuarioResponse,
    'tool':HerramientaResponse,
    'reporte':reporteResponse,
    'reserva_Install':Reserva_Instalacion_Response,
    'reserva_Herra':reserva_Herra_Response,
    
}
export const getEntityProperties=(entidad:string):Array<string>=>{
    const EntityClass=entityMap[entidad]
    if(!EntityClass){
        return []
    }
    const instance=new EntityClass()
    return Object.keys(instance)
}
