import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { map, Observable } from 'rxjs';
import { Reserva_Herr, Reserva_Herr as Reserva_Herramienta, Reserva_Instalacion } from '../../models/reservation';
import { HttpClient, HttpParams,} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private API_Re_Ins='http://localhost:5199/api/ReservacionInstalacions'
  private API_Re_Her='http://localhost:5199/api/ReservacionHerramientas'
  private API_Ins='http://localhost:5199/api/Instalacions'
  private API_Herr='http://localhost:5199/api/Herramientas'
  constructor(private services:GeneralService,private http:HttpClient) { }
  desactiveInstalacion(id:number):Observable<void>{
    return this.services.desactiveService<void>(this.API_Ins,id)
  }
  desactiveHerramienta(id:number):Observable<void>{
    return this.services.desactiveService<void>(this.API_Herr,id)
  }
  getReserva_Ins():Observable<Reserva_Instalacion[]>{
    return this.services.getService<Reserva_Instalacion>(this.API_Re_Ins,)
  }
  getReservaEntitys():Observable<Reserva_Instalacion[]>{
    return this.services.getServiceEntitys<Reserva_Instalacion>(this.API_Re_Ins,"/Instalacion_Reservas")
  }
  getReserva_Ins_Fi():Observable<Reserva_Instalacion[]>{
    return this.services.getServiceEntitys<Reserva_Instalacion>(this.API_Re_Ins,"/Reservas_Inst_Finalizada")
  }
  getReserva_Herr_Fi():Observable<Reserva_Herr[]>{
    return this.services.getServiceEntitys<Reserva_Herr>(this.API_Re_Ins,"/Reservas_Herr_Finalizada")
  }
  searchReserva_Ins(dato?: { [key: string]: string }): Observable<Reserva_Instalacion[]> {
      return this.services.searchService<Reserva_Instalacion>(`${this.API_Re_Ins}/search`,dato)
  }
  // search_2(input:string):Observable<Reserva_Instalacion[]>{
  //   return this.services.getServiceEntitys<Reserva_Instalacion>(this.API_Re_Ins,"/Instalacion_Reservas").pipe(
  //     map((reservas)=>
  //       reservas.filter((reservas)=>
  //         (input?
  //           reservas.usuario?.nombre?.toLowerCase().includes(input.toLowerCase())||
  //           reservas.usuario?.apellido?.toLowerCase().includes(input.toLowerCase())
  //         :true)
  //       )
  //     )
  //   )
  // }
  searchReserva_Her(dato?: { [key: string]: string }): Observable<Reserva_Herr[]> {
    return this.services.searchService<Reserva_Herr>(`${this.API_Re_Her}/search`,dato)
  }
  searchReserva_Ins_Fi(dato?: { [key: string]: string }): Observable<Reserva_Instalacion[]>{
    return this.services.searchService<Reserva_Instalacion>(`${this.API_Re_Ins}/search_Finalizada`,dato)
  }
  searchReserva_Herr_Fi(dato?: { [key: string]: string }): Observable<Reserva_Herr[]>{
    return this.services.searchService<Reserva_Herr>(`${this.API_Re_Her}/search_Finalizada`,dato)
  }
  getReserva_ID_Inst(id?:number):Observable<Reserva_Instalacion>{
    return this.services.getServiceID<Reserva_Instalacion>(this.API_Re_Ins,id)
  }
  getReserva_ID_Her(id?:number):Observable<Reserva_Herramienta>{
    return this.services.getServiceID<Reserva_Herramienta>(this.API_Re_Her,id)
  }
  getReserva_Her():Observable<Reserva_Herramienta[]>{
    return this.services.getServiceEntitys<Reserva_Herramienta>(this.API_Re_Her,"/Herramienta_Reservas")
  }
  addReserva_Inst(reserva:Reserva_Instalacion):Observable<Reserva_Instalacion>{
    console.log("Enviando a la API:", reserva);
    return this.services.addService<Reserva_Instalacion>(this.API_Re_Ins,reserva);
  }
  updateReserva_Inst(reserva:Reserva_Instalacion):Observable<Reserva_Instalacion>{
    let id=reserva.id??0
    return this.services.updateService<Reserva_Instalacion>(this.API_Re_Ins,id,reserva);
  }
  deleteReserva_Inst(id?:number):Observable<Reserva_Instalacion>{
    console.log(id)
    return this.services.deleteService<Reserva_Instalacion>(this.API_Re_Ins,id);
  }
  addReserva_Her(reserva:Reserva_Herramienta):Observable<Reserva_Herramienta>{
    console.log(reserva)
    return this.services.addService<Reserva_Herramienta>(this.API_Re_Her,reserva);
  }
  updateReserva_Her(reserva:Reserva_Herramienta):Observable<Reserva_Herramienta>{
    let id=reserva.id??0
    return this.services.updateService<Reserva_Herramienta>(this.API_Re_Her,id,reserva);
  }
  deleteReserva_Her(id?:number):Observable<Reserva_Herramienta>{
    return this.services.deleteService<Reserva_Herramienta>(this.API_Re_Her,id);
  }
}
