import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { FormComponent } from '../../../shared/form/form.component';
import { IPersonForm } from '../../../../models/person.data';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NotificationComponent } from "../../../shared/notification/notification.component";
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { LoginService } from '../../../../services/login-service/login.service';
import { Administrator } from '../../../../models/user';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [MatCard,NgIf,
    MatCardModule,
    ReactiveFormsModule,
    FormComponent,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatLabel, MatInput, NotificationComponent,MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  
  notification: { message: string; type: string  } = {
    message: '',
    type: 'info'
  };
  //type: 'info' | 'success' | 'error' | 'warning' 
  private formBuilder=inject(NonNullableFormBuilder);
  formGroup!:FormGroup
  constructor(private services:LoginService,private router:Router){}
  ngOnInit(): void {
    this.formGroup=this.formBuilder.group<IPersonForm>({
      dataPerson:this.formBuilder.group({
        nombre:this.formBuilder.control('',{validators:[Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]}),
        apellido:this.formBuilder.control('',{validators:[Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]}),
        correo:this.formBuilder.control('',{validators:[Validators.required,Validators.email]}),
        telefono:this.formBuilder.control('',{validators:[Validators.required,Validators.pattern(/^\d{10}$/)]})
      }),
      password:this.formBuilder.control('',{validators:[Validators.required,Validators.pattern(/^.{1,8}$/)]})
    })
  }
  onSubmit() {
    if(this.formGroup.invalid){
      this.viewNotification('Por favor llene los campos','warning',5000)
      return;
    }
    const newUser:Administrator=this.formGroup.value;
    this.services.addUser(newUser).subscribe({
      next:()=>{
        this.viewNotification('Usuario creado con exito','success',2000)
        this.router.navigate(['/Login'])
      },
      error:()=>{
        this.viewNotification('Error al crear usuario','error',5000)
      }
    })
  }
  
  viewNotification(message:string,type:string,duration:number){
    this.notification = { message, type };
    setTimeout(() => {
      this.notification = { message: '', type: 'info' };
    }, duration);
  }
}
