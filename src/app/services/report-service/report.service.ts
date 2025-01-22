import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { Observable } from 'rxjs';
import { Reporte } from '../../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private jsonAPI='http://localhost:5199/api/Reportes'
  getReport():Observable<Reporte[]> {
    return this.services.getService<Reporte>(this.jsonAPI)
  }
  // private jsonUrl='http://localhost:3000/reporte'
  constructor(private services:GeneralService) { }
}
