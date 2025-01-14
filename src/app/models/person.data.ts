import { FormControl, FormGroup } from "@angular/forms";

export interface IPersonDataForm{
    name:FormControl<string>
    lastname:FormControl<string>
    email:FormControl<string>
    phone:FormControl<string>
    
}
export interface IPersonForm{
    dataPerson:FormGroup<IPersonDataForm>
    password:FormControl<string>
}