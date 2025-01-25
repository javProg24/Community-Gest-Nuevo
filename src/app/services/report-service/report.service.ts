import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { Observable } from 'rxjs';
import { Reporte } from '../../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private ApiwebURL='http://localhost:5199/api/Reportes'
  getReport():Observable<Reporte[]> {
    return this.services.getService<Reporte>(this.ApiwebURL)
  }

  /*
  getReportesSearch(recursoAfectado?:string, title?:string):Observable<Reporte[]>{
    return this.services.get<Reporte[]>(this.ApiwebURL).pipe(
      map((reportes)=>
        reportes.filter((reporte)=>
        (recursoAfectado ? reporte.recursoAfectado?.toLocaleLowerCase().includes(recursoAfectado.toLowerCase()):true)
        )
      )
    );
  }*/

  //Crear Reportes
  addReporte(reporte:Reporte):Observable<Reporte>{
    return this.services.addService<Reporte>(this.ApiwebURL, reporte);
  }

  //Editar Reportes
  updateReports(id: number, reporte: Reporte):Observable<Reporte>{
    const urlReporte = `${this.ApiwebURL}/${reporte.id}`
    return this.services.updateService<Reporte>(this.ApiwebURL,id, reporte);
  }

  //Eliminar Reportes
  deleteReports(id:number, reporte:Reporte):Observable<void>{
    const urlReporte = `${this.ApiwebURL}/${reporte.id}`
    return this.services.deleteService<void>(this.ApiwebURL,id);
  }
  // private jsonUrl='http://localhost:3000/reporte'
  constructor(private services:GeneralService) { }
}
