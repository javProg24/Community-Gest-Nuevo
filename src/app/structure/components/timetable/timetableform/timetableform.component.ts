import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HorarioService } from '../../../../services/horario-service/horario.service';
import { Instalacion } from '../../../../models/instalation';
import { NgFor } from '@angular/common';
import { MatNativeDateModule, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import {MatTimepicker, MatTimepickerModule} from '@angular/material/timepicker';
import { MatDialogRef } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-timetableform',
  imports: [MatCardModule,MatFormFieldModule,MatSelectModule,
    ReactiveFormsModule,NgFor,MatOptionModule,MatTimepickerModule,
    MatCheckboxModule,MatInputModule,MatTimepicker,MatIconModule,
    MatNativeDateModule,MatFormField,
  ],
  templateUrl: './timetableform.component.html',
  styleUrl: './timetableform.component.css',
  providers:[provideNativeDateAdapter()]
})
export class TimetableformComponent implements OnInit{
  close() {
    this.dialogRef.close();
  }
  dias = [
    { value: 'Lunes', label: 'Lunes' },
    { value: 'Martes', label: 'Martes' },
    {value:'Miercoles',label:'Miercoles'},
    {value:'Jueves',label:'Jueves'},
    {value:'Viernes',label:'Viernes'},
    {value:'Sabado',label:'Sabado'},
    {value:'Domingo',label:'Domingo'},
  ];
  installations: { id?: number; attributeValue: string }[] = [];
  selectedInstallationId: number | undefined;
  constructor(private services:HorarioService,
    private fb:FormBuilder,public dialogRef:MatDialogRef<TimetableformComponent>
  ) { }
  ngOnInit(): void {
    this.formGroup=this.fb.group({
      instalacion:['',[Validators.required,]],
      dia:['',[Validators.required]],
      hora_Inicio:['',[Validators.required] ],
      hora_Fin:['',[Validators.required] ],
      activo:['',[Validators.required] ]
    })
    this.loadInstallations();
  }
  obSubmit() {
    console.log(this.formGroup.value)
  }
  formGroup!:FormGroup
  loadInstallations() {
    this.services.getInstallationNamesWithId().subscribe(
      (data) => {
        this.installations = data; // Asignar las instalaciones obtenidas
      },
      (error) => {
        console.error('Error al cargar instalaciones', error);
      }
    );
  }
}
