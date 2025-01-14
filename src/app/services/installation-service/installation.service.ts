import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { map, Observable } from 'rxjs';
import { Installation } from '../../models/instalation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {
  public jsonUrl='http://localhost:3000/instalaciones'
  constructor(private services:GeneralService, private http:HttpClient) { }
  getInstall():Observable<Installation[]>{
    return this.services.getService<Installation>(this.jsonUrl)
  }
  getNombreInstal():Observable<string[]>{
    return this.http.get<Installation[]>(this.jsonUrl).pipe(
      map(instalacion => instalacion.map(instalacion => instalacion.instalacion))
    )
  }
  getHorario(instalacionId: number): Observable<string | null> {
    return new Observable(observer => {
      this.http.get<any[]>(this.jsonUrl).subscribe(
        (instalaciones) => {
          // Buscar la instalación por ID
          const instalacion = instalaciones.find(inst => inst.id === instalacionId);
          
          if (instalacion) {
            // Concatenar el horario de inicio y fin
            observer.next(`${instalacion.hora_Inicio} - ${instalacion.hora_Fin}`);
          } else {
            observer.next(null);  // Si no encuentra la instalación, devuelve null
          }
        },
        (error) => {
          observer.error('Error al cargar los horarios');
        }
      );
    });
  }
  
}
