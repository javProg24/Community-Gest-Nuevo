import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private jsonUrl='http://localhost:3000/historial'
  constructor(private services:GeneralService) { }
}
