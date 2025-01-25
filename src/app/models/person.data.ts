import { FormControl, FormGroup } from "@angular/forms";

export interface IPersonDataForm{
    nombre:FormControl<string>
    apellido:FormControl<string>
    email:FormControl<string>
    telefono:FormControl<string>
    
}
export interface IPersonForm{
    dataPerson:FormGroup<IPersonDataForm>
    password:FormControl<string>
}