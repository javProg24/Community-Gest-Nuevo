import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { Observable } from 'rxjs';
import { Tool } from '../../models/tool';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  // private jsonUrl='http://localhost:3000/herramientas'
  private jsonAPI='http://localhost:5199/api/Herramientas'
  constructor(private services:GeneralService) { }
  getTools():Observable<Tool[]>{
    return this.services.getService<Tool>(this.jsonAPI)
  }
}
