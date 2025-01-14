import { Observable } from "rxjs";

export interface I_Metodos{
    getService<T>(url:string):Observable<T[]>;
    addService<T>(url:string,Entidad:any):Observable<T>;
    deleteService<T>(url:string, id:number):Observable<T>;
    updateService<T>(url: string, id: number,Entidad:any):Observable<T>;
}