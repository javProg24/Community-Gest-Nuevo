import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { map, Observable } from 'rxjs';
import { Herramienta } from '../../models/tool';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  private apiURL='http://localhost:5199/api/Herramientas'

  constructor(private services:GeneralService) { }
  getHerramientasDispo():Observable<Herramienta[]>{
    return this.services.getServiceEntitys<Herramienta>(this.apiURL,"/Cantidad")
    //return this.services.getService<Herramienta>(this.apiURL)
  }
  getTools():Observable<Herramienta[]>{
    return this.services.getService<Herramienta>(this.apiURL)
  }

  getToolsSearch(searchTerm: string): Observable<Herramienta[]> {
    const ruta = '';
    return this.services.getServiceEntitys<Herramienta>(this.apiURL, ruta).pipe(
      map((Herramientas) =>
        Herramientas.filter((Herramienta) =>
          (searchTerm ? 
            Herramienta.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            Herramienta.ubicacion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            Herramienta.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            Herramienta.cantidad?.toString().includes(searchTerm) ||
            Herramienta.disponibilidad?.toLowerCase().includes(searchTerm.toLowerCase())
          : true)
        )
      )
    );
  }

  addTool(herramienta: Herramienta):Observable<Herramienta>{
    return this.services.addService<Herramienta>(this.apiURL, herramienta);
  }

  updateTool(id: number, herramienta: Herramienta):Observable<Herramienta>{
    const urlTool = `${this.apiURL}/${herramienta.id}`
    return this.services.updateService<Herramienta>(this.apiURL, id, herramienta);
  }

  deleteTool(id:number, herramienta: Herramienta):Observable<void>{
    const urlTool = `${this.apiURL}/${herramienta.id}`
    return this.services.deleteService<void>(this.apiURL, id);
  }
}
