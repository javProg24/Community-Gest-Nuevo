import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { Observable } from 'rxjs';
import { Herramienta } from '../../models/tool';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  // private jsonUrl='http://localhost:3000/herramientas'
  private jsonAPI='http://localhost:5199/api/Herramientas'
  constructor(private services:GeneralService) { }
  getTools():Observable<Herramienta[]>{
    return this.services.getService<Herramienta>(this.jsonAPI)
  }
}
