import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { map, Observable, tap } from 'rxjs';

import { HttpClient, HttpParams,} from '@angular/common/http';
import { Reserva_Herr, Reserva_Instalacion } from '../../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private API_Re_Ins='http://localhost:5199/api/ReservacionInstalacions'
  private API_Re_Her='http://localhost:5199/api/ReservacionHerramientas'
  private API_Herr='http://localhost:5199/api/Herramientas'
  constructor(private services:GeneralService,private http:HttpClient) { }
  
  desactiveHerramienta(id:number):Observable<void>{
    return this.services.desactiveService<void>(this.API_Herr,id)
  }
  // getReserva_Ins():Observable<Reserva_Instalacion[]>{
  //   return this.services.getService<Reserva_Instalacion>(this.API_Re_Ins,)
  // }
  getReserva_Inst():Observable<Reserva_Instalacion[]>{
    return this.services.getServiceEntitys<Reserva_Instalacion>(this.API_Re_Ins,"/Instalacion_Reservas")
  }
  getReserva_Ins_Fi():Observable<Reserva_Instalacion[]>{
    return this.services.getServiceEntitys<Reserva_Instalacion>(this.API_Re_Ins,"/Reservas_Inst_Finalizada")
  }
  getReserva_Herr_Fi():Observable<Reserva_Herr[]>{
    return this.services.getServiceEntitys<Reserva_Herr>(this.API_Re_Her,"/Reservas_Herr_Finalizada")
  }
  getReserva_Her():Observable<Reserva_Herr[]>{
    return this.services.getServiceEntitys<Reserva_Herr>(this.API_Re_Her,"/Herramienta_Reservas")
    .pipe(
      tap(data => {
        console.log('Datos de reservas recibidos:', data);  // Verifica que se reciben los datos correctamente
      })
    );
  }
  searchReserva_Ins(dato?: { [key: string]: string }): Observable<Reserva_Instalacion[]> {
      return this.services.searchService<Reserva_Instalacion>(`${this.API_Re_Ins}/search`,dato)
  }
 
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
  getReserva_ID_Her(id?:number):Observable<Reserva_Herr>{
    console.log(id)
    return this.services.getServiceID<Reserva_Herr>(this.API_Re_Her,id)
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
  addReserva_Her(reserva:Reserva_Herr):Observable<Reserva_Herr>{
    console.log(reserva)
    return this.services.addService<Reserva_Herr>(this.API_Re_Her,reserva);
  }
  updateReserva_Her(reserva:Reserva_Herr):Observable<Reserva_Herr>{
    let id=reserva.id??0
    return this.services.updateService<Reserva_Herr>(this.API_Re_Her,id,reserva);
  }
  deleteReserva_Her(id?:number):Observable<Reserva_Herr>{
    return this.services.deleteService<Reserva_Herr>(this.API_Re_Her,id);
  }
  desactiveReserva_Insta(id:number):Observable<void>{
    return this.services.desactiveService<void>(this.API_Re_Ins,id)
  }
  desactiveReserva_Her(id:number):Observable<void>{
    return this.services.desactiveService<void>(this.API_Re_Her,id)
  }
}
