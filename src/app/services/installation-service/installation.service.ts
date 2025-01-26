import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { map, Observable } from 'rxjs';
import { Instalacion } from '../../models/instalation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {
  public jsonAPI='http://localhost:5199/api/Instalacions'
  constructor(private services:GeneralService) { }
  getInstall():Observable<Instalacion[]>{
    return this.services.getService<Instalacion>(this.jsonAPI)
  }
  
  getInstallsSearch(searchTerm: string): Observable<Instalacion[]> {
    const ruta = '';
    return this.services.getServiceEntity<Instalacion>(this.jsonAPI, ruta).pipe(
      map((Instalaciones) =>
        Instalaciones.filter((Instalacion) =>
          (searchTerm ? 
            Instalacion.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            Instalacion.tipo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            Instalacion.capacidad?.toString().includes(searchTerm)||
            Instalacion.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            Instalacion.dia?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            //Instalacion.horaInicio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            //Instalacion.horaFin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            Instalacion.disponibilidad?.toLowerCase().includes(searchTerm.toLowerCase())
          : true)
        )
      )
    );
  }
  
  addInstall(instalacion: Instalacion):Observable<Instalacion>{
    return this.services.addService<Instalacion>(this.jsonAPI, instalacion);
  }
  
  updateInstall(id: number, instalacion: Instalacion):Observable<Instalacion>{
    const urlTool = `${this.jsonAPI}/${instalacion.id}`
    return this.services.updateService<Instalacion>(this.jsonAPI, id, instalacion);
  }
  
  deleteInstall(id:number, instalacion: Instalacion):Observable<void>{
    const urlTool = `${this.jsonAPI}/${instalacion.id}`
    return this.services.deleteService<void>(this.jsonAPI, id);
  }
}
