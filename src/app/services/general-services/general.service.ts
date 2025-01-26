import { HttpClient, HttpParams } from '@angular/common/http';
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
  getServiceID<T>(url:string,id?:number):Observable<T>{
    const urlEntity = `${url}/${id}`
    return this.http.get<T>(urlEntity);
  }
  searchService<T>(url: string, dato?: { [key: string]: string }): Observable<T[]> {
    let params = new HttpParams();
  
    // Iterar sobre los datos y agregar solo parámetros válidos
    if (dato) {
      Object.keys(dato).forEach(key => {
        const value = dato[key];
        if (value) {
          params = params.set(key, value);
        }
      });
    }
    console.log(params)
    // Construir la URL completa y realizar la solicitud GET
    return this.http.get<T[]>(url, { params });
  }
  
  getServiceEntity<T>(url:string,ruta:string):Observable<T[]>{
    return this.http.get<T[]>(url+ruta);
  }
  addService<T>(url: string, Entidad: any): Observable<T> {
    console.log("Enviando a la API:", Entidad);
    return this.http.post<T>(url,Entidad);
  }
  deleteService<T>(url: string, id?: number): Observable<T> {
    console.log(id)
    const urlEntity = `${url}/${id}`
    return this.http.delete<T>(urlEntity)
  }
  updateService<T>(url: string, id: number,Entidad:any): Observable<T> {
    const urlEntity = `${url}/${id}`
    return this.http.put<T>(urlEntity,Entidad)
  }
  desactiveService<T>(url: string, id: number): Observable<T> {
    console.log(id); // Verificar que el id es el correcto
    const urlEntity = `${url}/desactive/${id}`; // Pasar el id en la URL
    return this.http.put<T>(urlEntity, {}); // Enviar un body vacío, ya que no se requiere contenido adicional
  }
}