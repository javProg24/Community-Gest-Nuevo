import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../services/login-service/login.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formGroup!:FormGroup;
  constructor(private fb:FormBuilder,private services:LoginService){}
  ngOnInit(): void {
    this.formGroup=this.fb.group({

    })
  }
  verify() {
    
  }
  
}
