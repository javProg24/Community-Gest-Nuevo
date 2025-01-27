import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { map, Observable } from 'rxjs';
import { Usuario } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  searchUser(input:string):Observable<Usuario[]> {
    // return  this.services.searchService<Usuario>(`${this.APIWeb}/search`,dato)
    const ruta = '';
      return this.services.getServiceEntitys<Usuario>(this.APIWeb, ruta).pipe(
        map((reportes) =>
          reportes.filter((reporte) =>
            (input ? 
              reporte.cedula?.toLowerCase().includes(input.toLowerCase()) || 
              reporte.nombre?.toLowerCase().includes(input.toLowerCase()) 
            : true)
          )
        )
      );
  }
  private APIWeb='http://localhost:5199/api/Usuarios'
  constructor(private services:GeneralService) { }
  getUsers():Observable<Usuario[]>{
    return this.services.getService<Usuario>(this.APIWeb)
  }
  addUser(usuario: Usuario): Observable<Usuario> {
    usuario.active='Y'
    return this.services.addService<Usuario>(this.APIWeb, usuario);
  }
  
  updateUser(id: number, usuario: Usuario): Observable<void> {
    return this.services.updateService<void>(this.APIWeb, id, usuario);
  }
  
  deleteUser(id: number): Observable<void> {
    return this.services.deleteService<void>(this.APIWeb, id);
  }
  desactiveUsuario(id:number):Observable<void>{
    console.log(id)
    return this.services.desactiveService<void>(this.APIWeb,id)
  }
}
