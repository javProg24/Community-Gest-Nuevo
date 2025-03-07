import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { map, Observable } from 'rxjs';
import { Instalacion } from '../../models/instalation';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {
  public APIWeb='http://localhost:5199/api/Instalacions'
  constructor(private services:GeneralService) { }
  getInstalaciones():Observable<Instalacion[]>{
    return this.services.getService<Instalacion>(this.APIWeb)
  }
  getInstalaciones_Disponibles():Observable<Instalacion[]>{
    return this.services.getServiceEntitys<Instalacion>(this.APIWeb,"/disponible")
  }
  getInstallsSearch(searchTerm: string): Observable<Instalacion[]> {
    const ruta = '';
    return this.services.getServiceEntitys<Instalacion>(this.APIWeb, ruta).pipe(
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
    return this.services.addService<Instalacion>(this.APIWeb, instalacion);
  }
  
  updateInstall(id: number, instalacion: Instalacion):Observable<Instalacion>{
    const urlTool = `${this.APIWeb}/${instalacion.id}`
    return this.services.updateService<Instalacion>(this.APIWeb, id, instalacion);
  }
  
  deleteInstall(id:number, instalacion: Instalacion):Observable<void>{
    const urlTool = `${this.APIWeb}/${instalacion.id}`
    return this.services.deleteService<void>(this.APIWeb, id);
  }
  desactiveInstalacion(id:number):Observable<void>{
    return this.services.desactiveService<void>(this.APIWeb,id)
  }
  activeInstalacion(id:number):Observable<void>{
    return this.services.activeService<void>(this.APIWeb,id)
  }
}
