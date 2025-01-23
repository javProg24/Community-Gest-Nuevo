import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatTimepicker, MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'app-installation-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatLabel,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormField,NgIf,MatTimepicker,MatTimepickerModule,MatCheckboxModule
    ,MatOptionModule,MatSelect,MatFormField,MatNativeDateModule,MatButtonModule,NgFor
  ],
  templateUrl: './installation-form.component.html',
  styleUrls: ['./installation-form.component.css'], // Corregido: styleUrls en lugar de styleUrl
  providers:[provideNativeDateAdapter()]
})
export class InstallationFormComponent implements OnInit {
  close() {
    this.dialogRef.close();
  }
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder,public dialogRef:MatDialogRef<InstallationFormComponent>) {}
  dias = [
    { value: 'Lunes', label: 'Lunes' },
    { value: 'Martes', label: 'Martes' },
    {value:'Miercoles',label:'Miercoles'},
    {value:'Jueves',label:'Jueves'},
    {value:'Viernes',label:'Viernes'},
    {value:'Sabado',label:'Sabado'},
    {value:'Domingo',label:'Domingo'},
  ];
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      instalacion: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', [Validators.required]],
      capacidad: ['', [Validators.required, Validators.min(1), Validators.max(500),Validators.pattern(/^\d+$/)]],
      descripcion: ['', [Validators.required]],
      dia:['',[Validators.required]],
      hora_Inicio:['',[Validators.required] ],
      hora_Fin:['',[Validators.required] ],
      activo:['',[Validators.required] ]
    });
  }

  onSubmit() {
    // Implementa la lógica de envío del formulario aquí
    console.log(this.formGroup.value);
  }
}
