import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-report-form',
  standalone:true,
  imports: [MatCardModule,
    MatLabel,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,NgIf,MatRadioModule,MatRadioButton,MatFormField
  ],
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css'
})
export class ReportFormComponent implements OnInit{
  formGroup!:FormGroup
submitted= false;
  constructor(private fb:FormBuilder,public dialogRef:MatDialogRef<ReportFormComponent>){}
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      titulo:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      recursoAfectado:['',[Validators.required]],
      estado:['',[Validators.required]]
    })
  }
  close(){
    this.dialogRef.close();
    this.submitted = false;
  }
  onSubmit(){
    this.submitted = true;
    if(this.formGroup.valid){
      console.log(this.formGroup.value);
    }
    
  }
}
