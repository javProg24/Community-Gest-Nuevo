import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { Observable } from 'rxjs';
import { Reserva_Herr as Reserva_Herramienta, Reserva_Instalacion } from '../../models/reservation';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private APIurl_Re_Ins='http://localhost:5199/api/ReservacionInstalacions'
  private APIurl_Re_Her='http://localhost:5199/api/ReservacionHerramientas'
  private jsonAPI='http://localhost:5199/api/Instalacions'
  constructor(private services:GeneralService,) { }
  desactiveInstalacion(id:number):Observable<void>{
    return this.services.desactiveService<void>(this.jsonAPI,id)
  }
  getReserva_Ins():Observable<Reserva_Instalacion[]>{
    return this.services.getService<Reserva_Instalacion>(this.APIurl_Re_Ins,)
  }
  getReservaEntitys():Observable<Reserva_Instalacion[]>{
    return this.services.getServiceEntity<Reserva_Instalacion>(this.APIurl_Re_Ins,"/Instalacion_Reservas")
  }
  getReserva_Ins_Fi():Observable<Reserva_Instalacion[]>{
    return this.services.getServiceEntity<Reserva_Instalacion>(this.APIurl_Re_Ins,"/Reservas_Inst_Finalizada")
  }
  searchReserva_Ins(nombre?: string, apellido?: string, instalacion?: string): Observable<Reserva_Instalacion[]> {
    let params = new HttpParams ();
  
    // Verificar y agregar los parámetros opcionales
    if (nombre) {
      params = params.set("nombre",nombre) // Corresponde al parámetro 'nombre'
    }
    if (apellido) {
      params = params.set("apellido",apellido) // Corresponde al parámetro 'apellido'
    }
    if (instalacion) {
      params = params.set("instalacion",instalacion) // Corresponde al parámetro 'instalacion'
    }
  
    console.log('Parámetros enviados:', params);
  
    // Llamar al servicio genérico
    return this.services.searchService<Reserva_Instalacion>(this.APIurl_Re_Ins, 'search', params);
  }
  
  
  getReserva_ID_Inst(id?:number):Observable<Reserva_Instalacion>{
    return this.services.getServiceID<Reserva_Instalacion>(this.APIurl_Re_Ins,id)
  }
  getReserva_ID_Her(id?:number):Observable<Reserva_Herramienta>{
    return this.services.getServiceID<Reserva_Herramienta>(this.APIurl_Re_Her,id)
  }
  getReserva_Her():Observable<Reserva_Herramienta[]>{
    return this.services.getServiceEntity<Reserva_Herramienta>(this.APIurl_Re_Her,"/Herramienta_Reservas")
  }
  addReserva_Inst(reserva:Reserva_Instalacion):Observable<Reserva_Instalacion>{
    console.log("Enviando a la API:", reserva);
    return this.services.addService<Reserva_Instalacion>(this.APIurl_Re_Ins,reserva);
  }
  updateReserva_Inst(reserva:Reserva_Instalacion):Observable<Reserva_Instalacion>{
    let id=reserva.id??0
    return this.services.updateService<Reserva_Instalacion>(this.APIurl_Re_Ins,id,reserva);
  }
  deleteReserva_Inst(id?:number):Observable<Reserva_Instalacion>{
    console.log(id)
    return this.services.deleteService<Reserva_Instalacion>(this.APIurl_Re_Ins,id);
  }
  addReserva_Her(reserva:Reserva_Herramienta):Observable<Reserva_Herramienta>{
    return this.services.addService<Reserva_Herramienta>(this.APIurl_Re_Her,reserva);
  }
  updateReserva_Her(reserva:Reserva_Herramienta):Observable<Reserva_Herramienta>{
    let id=reserva.id??0
    return this.services.updateService<Reserva_Herramienta>(this.APIurl_Re_Her,id,reserva);
  }
  deleteReserva_Her(id?:number):Observable<Reserva_Herramienta>{
    return this.services.deleteService<Reserva_Herramienta>(this.APIurl_Re_Her,id);
  }
}
