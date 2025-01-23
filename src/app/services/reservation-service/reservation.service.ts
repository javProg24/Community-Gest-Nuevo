import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { Observable } from 'rxjs';
import { Reserva_Herr as Reserva_Herramienta, Reserva_Instalacion } from '../../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private jsonUrlI='http://localhost:5199/api/ReservacionInstalacions'
  private jsonURLH='http://localhost:5199/api/ReservacionHerramientas'
  constructor(private services:GeneralService) { }
  getReserva_Ins():Observable<Reserva_Instalacion[]>{
    return this.services.getService<Reserva_Instalacion>(this.jsonUrlI,)
  }
  getReserva_Her():Observable<Reserva_Herramienta[]>{
    return this.services.getServiceEntity<Reserva_Herramienta>(this.jsonURLH,"/Herramienta_Reservas")
  }
  addReserva_Inst(reserva:Reserva_Instalacion):Observable<Reserva_Instalacion>{
    return this.services.addService<Reserva_Instalacion>(this.jsonUrlI,reserva);
  }
  updateReserva_Inst(id:number,reserva:Reserva_Instalacion):Observable<Reserva_Instalacion>{
    return this.services.updateService<Reserva_Instalacion>(this.jsonUrlI,id,reserva);
  }
  deleteReserva_Inst(id:number):Observable<Reserva_Instalacion>{
    return this.services.deleteService<Reserva_Instalacion>(this.jsonUrlI,id);
  }
  addReserva_Her(reserva:Reserva_Herramienta):Observable<Reserva_Herramienta>{
    return this.services.addService<Reserva_Herramienta>(this.jsonURLH,reserva);
  }
  updateReserva_Her(id:number,reserva:Reserva_Herramienta):Observable<Reserva_Herramienta>{
    return this.services.updateService<Reserva_Herramienta>(this.jsonURLH,id,reserva);
  }
  deleteReserva_Her(id:number):Observable<Reserva_Herramienta>{
    return this.services.deleteService<Reserva_Herramienta>(this.jsonURLH,id);
  }
}
