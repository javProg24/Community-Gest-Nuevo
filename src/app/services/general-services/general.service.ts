import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { I_Metodos } from '../../models/I_Metodo';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService implements I_Metodos{

  constructor(private http:HttpClient) { }
  getService<T>(url: string): Observable<T[]>{
    return this.http.get<T[]>(url);
  }
  getServiceID<T>(url:string,id:number):Observable<T[]>{
    const urlEntity = `${url}/${id}`
    return this.http.get<T[]>(urlEntity);
  }
  getServiceEntity<T>(url:string,ruta:string):Observable<T[]>{
    return this.http.get<T[]>(url+ruta);
  }
  addService<T>(url: string, Entidad: any): Observable<T> {
    return this.http.post<T>(url,Entidad);
  }
  deleteService<T>(url: string, id: number): Observable<T> {
    const urlEntity = `${url}/${id}`
    return this.http.delete<T>(urlEntity)
  }
  updateService<T>(url: string, id: number,Entidad:any): Observable<T> {
    const urlEntity = `${url}/${id}`
    return this.http.put<T>(urlEntity,Entidad)
  }
  // getAllRelatedData<T, U>(url1: string, url2: string): Observable<{ data1: T[], data2: U[] }> {
    
  //   return forkJoin([
  //     this.getService<T>(url1),  
  //     this.getService<U>(url2),  
  //   ]).pipe(
  //     map(([data1, data2]:[T[],U[]]) => {
  //       return { data1, data2 };
  //     })
  //   );
  // }
  // getAttribute<T extends { id?: number }, K extends keyof T>(url: string, attribute: K): Observable<{ id?: number; attributeValue: T[K] }[]> {
  //   return this.getService<T>(url).pipe(
  //     map((entities: T[]) =>
  //       entities.map((entity) => {
  //         return { id: entity.id, attributeValue: entity[attribute] }; // id ahora es opcional
  //       })
  //     )
  //   );
  // }
  // getAttributeWithConcatenation<T extends { id?: number }>(
  //   url: string,
  //   concatenateAttributes: (entity: T) => string
  // ): Observable<{ id?: number; concatenated: string }[]> {
  //   return this.getService<T>(url).pipe(
  //     map((entities: T[]) =>
  //       entities.map((entity) => ({
  //         id: entity.id,
  //         concatenated: concatenateAttributes(entity), // Concatenar atributos
  //       }))
  //     )
  //   );
  // }
  
  
  
  

}