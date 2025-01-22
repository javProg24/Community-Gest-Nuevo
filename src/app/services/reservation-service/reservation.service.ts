import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { Observable } from 'rxjs';
import { Reserva_Herr, Reservation_Install } from '../../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private jsonUrlI='http://localhost:5199/api/ReservacionInstalacions'
  private jsonURLH='http://localhost:5199/api/ReservacionHerramientas'
  constructor(private services:GeneralService) { }
  getReserva_Ins():Observable<Reservation_Install[]>{
    return this.services.getService<Reservation_Install>(this.jsonUrlI)
  }
  getReserva_Her():Observable<Reserva_Herr[]>{
    return this.services.getService<Reserva_Herr>(this.jsonURLH)
  }
}
