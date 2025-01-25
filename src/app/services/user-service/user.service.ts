import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { map, Observable } from 'rxjs';
import { Usuario } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jsonAPI='http://localhost:5234/api/Usuarios'
  constructor(private services:GeneralService) { }
  getUsers():Observable<Usuario[]>{
    return this.services.getService<Usuario>(this.jsonAPI)
  }
}
