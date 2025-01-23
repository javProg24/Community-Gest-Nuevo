import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { Observable } from 'rxjs';
import { Miembros } from '../../models/member';

@Injectable({
  providedIn: 'root'
})
export class MerbersService {
  private jsonUrl='http://localhost:3000/integrantes';
  constructor(private services: GeneralService) { }
  getMembers():Observable<Miembros[]>{
    return this.services.getService<Miembros>(this.jsonUrl);
  }
}
