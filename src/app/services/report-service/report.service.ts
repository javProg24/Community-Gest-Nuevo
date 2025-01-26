import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { map, Observable } from 'rxjs';
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
 //Buscar Reportes
 //No he realizado camios en ninguna otra clase a excepcion de esta por si se daña algo.
 
 getReportesSearch(searchTerm: string): Observable<Reporte[]> {
  const ruta = '';
  return this.services.getServiceEntity<Reporte>(this.ApiwebURL, ruta).pipe(
    map((reportes) =>
      reportes.filter((reporte) =>
        // Filtra por título si searchTerm está presente
        (searchTerm ? 
          reporte.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          reporte.recursoAfectado?.toLowerCase().includes(searchTerm.toLowerCase()) 
        : true)
      )
    )
  );
}
  
/*
 getReportesSearch(filtros: { titulo?: string; recursoafectado?: string }): Observable<Reporte[]> {
  const ruta = '';
  return this.services.getServiceEntity<Reporte>(this.ApiwebURL, ruta).pipe(
    map((reportes) =>
      reportes.filter((reporte) =>
        (filtros.titulo ? reporte.titulo?.toLowerCase().includes(filtros.titulo.toLowerCase()) : true) &&
        (filtros.recursoafectado ? reporte.recursoAfectado?.toLowerCase().includes(filtros.recursoafectado.toLowerCase()): true)
      )
    )
  );
}
  */
  
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
