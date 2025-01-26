import { NgIf } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { Reporte } from '../../../../models/report';
import { ReportService } from '../../../../services/report-service/report.service';
import { getEntityProperties } from '../../../../models/tabla-columna';

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
  notification: { message: string; type: 'info' | 'success' | 'error' | 'warning'  } = {
    message: '',
    type: 'info'
  };
  @Output() reportUpdated = new EventEmitter<void>();
  formGroup!:FormGroup
  editMode: boolean=false;
  currentId?:number;
  editId: string | null = null;
  submitted= false;
  reportList:Reporte[]=[]
  columns:string[]=[]
  constructor(
    private fb:FormBuilder,
    public dialogRef:MatDialogRef<ReportFormComponent>, 
    private services:ReportService,
    @Inject('notificationEmitted') private notificationEmitter: EventEmitter<{ message: string, type: string }>,
    @Inject('formData')public formData:Reporte|null){}
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      titulo:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      recursoAfectado:['',[Validators.required]],
      estado:['',[Validators.required]]
    })
    
  if (this.formData) {
    // console.log(this.formData)
    if (this.formData.id) {
      this.editMode = true;
      this.currentId = this.formData.id;
      this.formGroup.patchValue({
        titulo: this.formData.titulo,
        descripcion: this.formData.descripcion,
        recursoAfectado: this.formData.recursoAfectado,
        estado: this.formData.estado,
      });
    } else {
      this.editMode = false;
    }
  } else {
    this.editMode = false;
  }

  }
  close(){
    this.dialogRef.close();
    this.submitted = false;
  }
  onSubmit(){
      this.submitted = true;

      if (this.formGroup.invalid) {
        console.error('Formulario inválido:', this.formGroup.errors);
        return;
      }
    
      const reporte: Reporte = {
        ...this.formGroup.value, 
        id: this.editMode ? this.currentId : undefined,
      };
    
      if (this.editMode) {
        // Actualizar reporte existente
        if (!this.currentId) {
          console.error('ID faltante para la actualización');
          return;
        }
    
        this.services.updateReports(this.currentId, reporte).subscribe({
          next: (update) => {
            // alert('El reporte fue editado exitosamente');
            this.reportUpdated.emit();
            this.dialogRef.close();
            // this.notificationEmitted.emit({ message: 'El reporte ha sido actualizado', type: 'success' });
            this.notificationEmitter.emit({ message: 'Reporte actualizado correctamente', type: 'success' });
          },
          error: (err) => {
            console.error('Error al actualizar el reporte:', err);
          },
        });
      } else {
        // Crear nuevo reporte
        this.services.addReporte(reporte).subscribe({
          next: () => {
            // alert('El reporte fue agregado exitosamente');
            this.reportUpdated.emit();
            this.dialogRef.close();
            this.notificationEmitter.emit({ message: 'Reporte creado correctamente', type: 'success' });
          },
          error: (err) => {
            console.error('Error al crear el reporte:', err);
          },
        });
      }
      setTimeout(()=>{
        this.notification={message:'',type:'info'}
      },1500)
  }
  // @Output() notificationEmitted = new EventEmitter<{ message: string, type: string }>();

}
