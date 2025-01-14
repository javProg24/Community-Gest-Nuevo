import { Injectable } from '@angular/core';
import { GeneralService } from '../general-services/general.service';
import { find, map, Observable } from 'rxjs';
import { Administrator } from '../../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private jsonUrl='http://localhost:3000/administrador'
  constructor(private services:GeneralService,private http:HttpClient) { }
  addUser(User:Administrator):Observable<Administrator>{
    return this.services.addService<Administrator>(this.jsonUrl,User);
  }
  getUser(user:Administrator):Observable<boolean>{
    return this.services.getService<Administrator>(this.jsonUrl).pipe(
      map((administrator:Administrator[])=>
        administrator.some(a=>a.email===user.email&&a.password===user.password)
      )
    )
  }
  getAd(user:Administrator):Observable<Administrator>{
    return this.services.addService<Administrator>(
      `${this.jsonUrl}`,user
    )
  }
}
