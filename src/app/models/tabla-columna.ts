import { installationResponse } from "./instalation";
import { reporteResponse } from "./report";
import { reserva_Herra_Response, reservation_Install_Response } from "./reservation";
import { TimetableResponse } from "./timetable";
import { toolResponse } from "./tool";
import { userResponse } from "./user";

export interface Accion<T = any> {
    accion:string;
    fila?:T;
}
const entityMap:{[key: string]:any}={
    'install':installationResponse,
    'user':userResponse,
    'tool':toolResponse,
    'reporte':reporteResponse,
    'reserva_Install':reservation_Install_Response,
    'reserva_Herra':reserva_Herra_Response,
    'horario':TimetableResponse,
}
export const getEntityProperties=(entidad:string):Array<string>=>{
    const EntityClass=entityMap[entidad]
    if(!EntityClass){
        return []
    }
    const instance=new EntityClass()
    return Object.keys(instance)
}
// export const getEntityProperties = (entidad:string):Array<any>=>{
//     let resultados:any=[];
//     let clase:any;
//     switch(entidad){
//         case 'instalation':
//             clase = new instalationResponse();break;
//         case 'user':
//             clase = new userResponse();break;
//         case 'tool':
//             clase = new toolResponse();break;
//         case 'report':
//             clase = new reportResponse();break;
//         case 'reservation':
//             clase = new reservationResponse();break;
//     }
//     if(clase){
//         resultados = Object.keys(clase);
//     }
//     return resultados;
// }
