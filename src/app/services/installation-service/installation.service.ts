import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { map, Observable } from 'rxjs';
import { Installation } from '../../models/instalation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {
  // public jsonUrl='http://localhost:3000/instalaciones'
  public jsonAPI='http://localhost:5199/api/Instalacions'
  constructor(private services:GeneralService, private http:HttpClient) { }
  getInstall():Observable<Installation[]>{
    return this.services.getService<Installation>(this.jsonAPI)
  }
  
}
