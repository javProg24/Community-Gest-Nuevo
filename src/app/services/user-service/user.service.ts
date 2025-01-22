import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { map, Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jsonAPI='http://localhost:5199/api/Usuarios'
  constructor(private services:GeneralService) { }
  getUsers():Observable<User[]>{
    return this.services.getService<User>(this.jsonAPI)
  }
  // getUserNameWithID(): Observable<{ id?: number; concatenated: string }[]> {
  //   return this.services.getAttributeWithConcatenation(
  //     this.jsonUrl,
  //     (entity:User) => `${entity.nombre} ${entity.apellido}` // Concatenación de atributos
  //   );
  // }
  
  
}
