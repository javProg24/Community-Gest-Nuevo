import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { map, Observable } from 'rxjs';
import { Usuario } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jsonAPI='http://localhost:5199/api/Usuarios'
  constructor(private services:GeneralService) { }
  getUsers():Observable<Usuario[]>{
    return this.services.getService<Usuario>(this.jsonAPI)
  }
  addUser(usuario: Usuario): Observable<Usuario> {
    return this.services.addService<Usuario>(this.jsonAPI, usuario);
  }
  
  updateUser(id: number, usuario: Usuario): Observable<void> {
    return this.services.updateService<void>(this.jsonAPI, id, usuario);
  }
  
  deleteUser(id: number): Observable<void> {
    return this.services.deleteService<void>(this.jsonAPI, id);
  }
  desactiveUsuario(id:number):Observable<void>{
    console.log(id)
    return this.services.desactiveService<void>(this.jsonAPI,id)
  }
}
