import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { Observable } from 'rxjs';
import { Member } from '../../models/member';

@Injectable({
  providedIn: 'root'
})
export class MerbersService {
  private jsonUrl='http://localhost:3000/integrantes';
  constructor(private services: GeneralService) { }
  getMembers():Observable<Member[]>{
    return this.services.getService<Member>(this.jsonUrl);
  }
}
