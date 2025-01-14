import { Component, inject, OnInit } from '@angular/core';
import { FormComponent } from "../../shared/form/form.component";
import { MatCard, MatCardModule } from '@angular/material/card';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPersonForm } from '../../../models/person.data';
import { IUserForm, User } from '../../../models/user';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Accion, getEntityProperties } from '../../../models/tabla-columna';
import { UserService } from '../../../services/user-service/user.service';
import { TableComponent } from "../../shared/table/table.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormComponent } from '../../shared/dialog-form/dialog-form.component';
import { ToolFormComponent } from '../tool/tool-form/tool-form.component';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-user',
  imports: [MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, TableComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  
  formGroup!:FormGroup
  userList:User[]=[]
  columns:string[]=[]
  title:string='Usuarios'
  private formBuilder=inject(NonNullableFormBuilder)
  constructor(private services:UserService, private dialog:MatDialog) { }
  ngOnInit(): void {
    this.formGroup=this.formBuilder.group<IUserForm>({
      identity_card:this.formBuilder.control('',{validators:[Validators.required,Validators.pattern(/^\d{10}$/)]}),
      dataPerson: this.formBuilder.group({
        name: this.formBuilder.control('', { validators: [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)] }),
        lastname: this.formBuilder.control('', { validators: [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)] }),
        email: this.formBuilder.control('', { validators: [Validators.required, Validators.email] }),
        phone: this.formBuilder.control('', { validators: [Validators.required, Validators.pattern(/^\d{10}$/)] })
      }),
    })
    this.getUsers();
  }
  getUsers(){
    this.columns=getEntityProperties('user')
    this.services.getUsers().subscribe((data)=>{
      this.userList=data
    })
  }
  onAction(accion:Accion){
    if(accion.accion=='Editar'){
      this.editar(accion.fila)
    }else if(accion.accion=='Eliminar'){
      this.eliminar(accion.fila)
    }
  }
  eliminar(nombre:any){
    console.log("eliminar",nombre)
  }
  editar(objeto:any){
    console.log("editar",objeto)
  }
  openDialog() {
    const dialogRef=this.dialog.open(DialogFormComponent,{
      autoFocus: false,
      disableClose: true,
      data:{component:UserFormComponent},
      width:'500px'
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        console.log("Cerrar");
      }
    });
  }
}
