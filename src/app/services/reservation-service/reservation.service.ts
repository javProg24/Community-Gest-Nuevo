import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { Observable } from 'rxjs';
import { Reserva_Herr, Reservation_Install } from '../../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private jsonUrlI='http://localhost:3000/reserva_Instalacion'
  private jsonURLH='http://localhost:3000/reserva_Herramientas'
  constructor(private services:GeneralService) { }
  getReserva_Ins():Observable<Reservation_Install[]>{
    return this.services.getService<Reservation_Install>(this.jsonUrlI)
  }
  getReserva_Her():Observable<Reserva_Herr[]>{
    return this.services.getService<Reserva_Herr>(this.jsonURLH)
  }
}
