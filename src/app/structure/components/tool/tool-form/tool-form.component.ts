import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from '../../../shared/form/form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-tool-form',
  standalone:true,
  imports: [MatCardModule,
    MatLabel,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormField,NgIf,NgFor,
    MatOptionModule,MatSelectModule],
  templateUrl: './tool-form.component.html',
  styleUrl: './tool-form.component.css'
})
export class ToolFormComponent implements OnInit{
  ngOnInit(): void {
    this.formGroup=this.fb.group({
      herramienta:['',[Validators.required,Validators.minLength(3)]],
      ubicacion:['',[Validators.required,Validators.minLength(3)]],
      descripcion: ['', [Validators.required]],
      cantidad:['',[Validators.required, Validators.min(1), Validators.max(500),Validators.pattern(/^\d+$/)]],
      estado:['',[Validators.required]]
    })
  }
close() {
  this.dialogRef.close();
}
  estados = [
    { value: 'activo', viewValue: 'Activo' },
    { value: 'inactivo', viewValue: 'Inactivo' },
    { value: 'pendiente', viewValue: 'Pendiente' }
  ];
onSubmit() {
  console.log(this.formGroup.value)
}
  formGroup!:FormGroup
  constructor(private fb:FormBuilder,public dialogRef:MatDialogRef<ToolFormComponent>){}
}
