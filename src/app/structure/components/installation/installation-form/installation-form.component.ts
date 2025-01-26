import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatTimepicker, MatTimepickerModule } from '@angular/material/timepicker';
import { Instalacion } from '../../../../models/instalation';
import { InstallationService } from '../../../../services/installation-service/installation.service';
import { MatRadioModule } from '@angular/material/radio';

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
    MatFormField,MatTimepicker,MatTimepickerModule,MatCheckboxModule
    ,MatOptionModule,MatSelect,MatFormField,MatNativeDateModule,MatButtonModule,
    NgFor, NgIf, MatRadioModule
  ],
  templateUrl: './installation-form.component.html',
  styleUrls: ['./installation-form.component.css'], // Corregido: styleUrls en lugar de styleUrl
  providers:[provideNativeDateAdapter()]
})
export class InstallationFormComponent implements OnInit {
  close() {
    this.dialogRef.close();
    this.submitted = false;
  }

  formGroup!: FormGroup;
  editMode: boolean = false
  currentId?: number
  editId: string | null = null
  submitted= false
  installList: Instalacion[] = []
  columns: string[] = []
  @Output() installUpdated = new EventEmitter<void>();

  constructor(private fb: FormBuilder,
    public dialogRef:MatDialogRef<InstallationFormComponent>,
    private services:InstallationService,
    @Inject(MAT_DIALOG_DATA) public data: Instalacion | null) {}
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
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      tipo: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      capacidad: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      descripcion: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
      dia:['',[Validators.required]],
      horaInicio:['',[Validators.required] ],
      horaFin:['',[Validators.required] ],
      disponibilidad:['',[Validators.required] ]
    });
    if (this.data) {
      if (this.data.id) {
        this.editMode = true;
        this.currentId = this.data.id;
        const parsedHoraInicio = this.parseToTime(this.data.horaInicio);
        const parsedHoraFin = this.parseToTime(this.data.horaFin);
        this.formGroup.patchValue({
          nombre: this.data.nombre,
          tipo: this.data.tipo,
          capacidad: this.data.capacidad,
          descripcion: this.data.descripcion,
          dia: this.data.dia,
          horaInicio: parsedHoraInicio, // Enviar objeto Date
          horaFin: parsedHoraFin,       // Enviar objeto Date
          disponibilidad: this.data.disponibilidad
        });
        
      } else {
        this.editMode = false;
      }
    } else {
      this.editMode = false;
    }
  }
  private parseToTime(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number); // Divide 'hh:mm' en partes
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Ajusta la hora y los minutos
    return date;
  }
  onSubmit() {
  this.submitted = true;
      console.log(this.formGroup.value);

    if (this.formGroup.invalid) {
      console.error('Formulario inválido:', this.formGroup.errors);
      return;
      }
    console.log('Formulario válido, creando registro:', this.formGroup.value);
    

    //const diaValue = this.formGroup.value.dia;
    const horaInicioValue = this.formGroup.value.horaInicio;
    const horaFinalValue = this.formGroup.value.horaFin;
      
    const dateInicio: Date=horaInicioValue;
    const hoursInicio = dateInicio.getHours();
    const minutesInicio = dateInicio.getMinutes();

    const timeIncio = `${hoursInicio.toString().padStart(2, '0')}:${minutesInicio.toString().padStart(2, '0')}`;

    const dateFinal: Date=horaFinalValue;
    const hoursFinal = dateFinal.getHours();
    const minutesFinal = dateFinal.getMinutes();
    
    const timeFinal = `${hoursFinal.toString().padStart(2, '0')}:${minutesFinal.toString().padStart(2, '0')}`;

    console.log(this.formGroup.value.disponibilidad)

    let instalacion: Instalacion = this.formGroup.value
    instalacion.horaInicio = timeIncio;
    instalacion.horaFin= timeFinal;
    instalacion.disponibilidad = "" + this.formGroup.value.disponibilidad 
    instalacion.id  = this.editMode ? this.currentId : undefined
    
      
    
      console.log("datos enviado", instalacion);

    if (this.editMode) {
      if (!this.currentId) {
        console.error('ID faltante para la actualización');
        return;
        }

    this.services.updateInstall(this.currentId, instalacion).subscribe({
      next: () => {
        alert('La instalacion fue editado exitosamente');
        this.installUpdated.emit();
        this.dialogRef.close();
        },
        error: (err) => {
          console.error('Error al actualizar la instalacion:', err);
        },
        });
      } else {
        this.services.addInstall(instalacion).subscribe({          
          next: () => {
            alert('La instalacion fue agregado exitosamente');
            this.installUpdated.emit();
            this.dialogRef.close();
          },
          error: (err) => {
            console.error('Error al crear la instalacion:', err);
          },
        });
      }
  }
}
