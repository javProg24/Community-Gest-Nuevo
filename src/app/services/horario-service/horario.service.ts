import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { forkJoin, map, Observable } from 'rxjs';
import { Timetable } from '../../models/timetable';
import { InstallationService } from '../installation-service/installation.service';
import { Installation } from '../../models/instalation';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
    private jsonUrl='http://localhost:3000/horarios'
    private jsonUrlI: string;
  constructor(private service:GeneralService, private install: InstallationService) { 
    this.jsonUrlI = this.install.jsonUrl;
  }
  addHorario(Entidad:Timetable):Observable<Timetable>{
    return this.service.addService<Timetable>(this.jsonUrl,Entidad);
  }
  deleteHorario(id:number):Observable<Timetable>{
    return this.service.deleteService<Timetable>(this.jsonUrl,id)
  }
  updateHorario(id:number,Entidad:Timetable):Observable<Timetable>{
    return this.service.updateService<Timetable>(this.jsonUrl,id,Entidad);
  }
  getHorario_Instal():Observable<Timetable[]>{
    return this.service.getAllRelatedData<Timetable,Installation>(this.jsonUrl,this.jsonUrlI).pipe(
      map((response)=>{
        return response.data1.map((timetable)=>{
          const instalacion=response.data2.find(
            (inst)=>inst.id===timetable.instalacion_ID
          )
          return{
            ...timetable,
            nombreInstall:instalacion?instalacion.nombre:'Desconocida'
          }
        })
      })
    )
  }
  getInstallationNamesWithId(): Observable<{ id?: number; attributeValue: string }[]> {
    return this.service.getAttribute<Installation, 'instalacion'>(this.jsonUrlI, 'instalacion');
  }
}
