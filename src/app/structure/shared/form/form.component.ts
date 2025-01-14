import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { NotificationComponent } from "../notification/notification.component";
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-form',
  standalone:true,
  imports: [MatFormFieldModule,
    MatLabel,
    NgIf,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule, MatFormField],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  // @Input({ required: true }) title = '';
  @Input({ required: true }) controlKey = '';
  formGroup!: FormGroup;
  private parentContainer=inject(ControlContainer);
  constructor(){}
  ngOnInit(): void {
    this.formGroup=this.parentFormGroup;
  }
  get parentFormGroup(){
    return this.parentContainer.control?.get(this.controlKey) as FormGroup;
  } 
}
