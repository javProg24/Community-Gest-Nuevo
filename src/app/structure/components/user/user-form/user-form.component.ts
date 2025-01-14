import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from "../../../shared/form/form.component";
import { UserService } from '../../../../services/user-service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { IUserForm } from '../../../../models/user';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [MatFormFieldModule, MatCardModule, ReactiveFormsModule,
    MatLabel, MatInputModule, FormComponent,MatButtonModule,NgIf],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{
  private formBuilder=inject(NonNullableFormBuilder)
  constructor(private services:UserService,private dialog:MatDialog){}
  ngOnInit(): void {
    this.formGroup=this.formBuilder.group<IUserForm>({
      identity_card:this.formBuilder.control('',{validators:[Validators.required,Validators.pattern(/^\d{10}$/)]}),
      dataPerson:this.formBuilder.group({
        name:this.formBuilder.control('',{validators:[Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]}),
        lastname:this.formBuilder.control('',{validators:[Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]}),
        email:this.formBuilder.control('',{validators:[Validators.required,Validators.email]}),
        phone:this.formBuilder.control('',{validators:[Validators.required,Validators.pattern(/^\d{10}$/)]})
      })
    })
  }
  onSubmit() {
    console.log(this.formGroup.value)
  } 
  formGroup!:FormGroup

}
