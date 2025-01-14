import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { Observable } from 'rxjs';
import { Tool } from '../../models/tool';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private jsonUrl='http://localhost:3000/herramientas'
  constructor(private services:GeneralService) { }
  getTools():Observable<Tool[]>{
    return this.services.getService<Tool>(this.jsonUrl)
  }
  getHerramWithID(): Observable<{ id?: number; attributeValue: string }[]> {
      return this.services.getAttribute<Tool, 'herramienta'>(this.jsonUrl, 'herramienta');
  }
}
