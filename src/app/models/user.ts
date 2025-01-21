import { FormControl, FormGroup } from "@angular/forms";
import { IPersonDataForm } from "./person.data";

export interface User{
    id?:number;
    cedula:string;
    nombre:string;
    apellido:string;
    correo:string;
    telefono:string;
}
export class userResponse{
    id?=0;
    cedula='';
    nombre='';
    apellido='';
    correo='';
    telefono='';
}
export interface IUserForm{
    identity_card:FormControl<string>;
    dataPerson:FormGroup<IPersonDataForm>;

}
export interface Administrator{
    id?:number;
    name:string;
    lastname:string;
    email:string;
    phone:string;
    password:string
}