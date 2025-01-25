import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { Observable } from 'rxjs';
import { Reserva_Herr as Reserva_Herramienta, Reserva_Instalacion } from '../../models/reservation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private jsonUrlI='http://localhost:5199/api/ReservacionInstalacions'
  private jsonURLH='http://localhost:5199/api/ReservacionHerramientas'
  constructor(private services:GeneralService,private http:HttpClient) { }
  getReserva_Ins():Observable<Reserva_Instalacion[]>{
    return this.services.getService<Reserva_Instalacion>(this.jsonUrlI,)
  }
  getReservaEntitys():Observable<Reserva_Instalacion[]>{
    return this.services.getServiceEntity<Reserva_Instalacion>(this.jsonUrlI,"/Instalacion_Reservas")
  }
  getReserva_Ins_Fi():Observable<Reserva_Instalacion[]>{
    return this.services.getServiceEntity<Reserva_Instalacion>(this.jsonUrlI,"/Reservas_Inst_Finalizada")
  }
  searchReserva_Ins(nombre_Apellido?: string, fecha?: Date): Observable<Reserva_Instalacion[]> {
    const params = {
      nombre_Apellido: nombre_Apellido,
      fecha: fecha ? fecha.toISOString() : null // Asegúrate de enviar la fecha en formato adecuado
    };
    return this.services.searchService<Reserva_Instalacion>(this.jsonUrlI, '/buscar', params);
  }
  
  getReserva_ID(id?:number):Observable<Reserva_Instalacion>{
    return this.services.getServiceID<Reserva_Instalacion>(this.jsonUrlI,id)
  }
  getReserva_Her():Observable<Reserva_Herramienta[]>{
    return this.services.getServiceEntity<Reserva_Herramienta>(this.jsonURLH,"/Herramienta_Reservas")
  }
  addReserva_Inst(reserva:Reserva_Instalacion):Observable<Reserva_Instalacion>{
    console.log("Enviando a la API:", reserva);
    return this.services.addService<Reserva_Instalacion>(this.jsonUrlI,reserva);
  }
  updateReserva_Inst(reserva:Reserva_Instalacion):Observable<Reserva_Instalacion>{
    let id=reserva.id??0
    return this.services.updateService<Reserva_Instalacion>(this.jsonUrlI,id,reserva);
  }
  deleteReserva_Inst(id?:number):Observable<Reserva_Instalacion>{
    console.log(id)
    return this.services.deleteService<Reserva_Instalacion>(this.jsonUrlI,id);
  }
  addReserva_Her(reserva:Reserva_Herramienta):Observable<Reserva_Herramienta>{
    return this.services.addService<Reserva_Herramienta>(this.jsonURLH,reserva);
  }
  updateReserva_Her(id:number,reserva:Reserva_Herramienta):Observable<Reserva_Herramienta>{
    return this.services.updateService<Reserva_Herramienta>(this.jsonURLH,id,reserva);
  }
  deleteReserva_Her(id?:number):Observable<Reserva_Herramienta>{
    return this.services.deleteService<Reserva_Herramienta>(this.jsonURLH,id);
  }
}
