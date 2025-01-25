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
    @Inject(MAT_DIALOG_DATA) public data: Reporte | null){}
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      titulo:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      recursoAfectado:['',[Validators.required]],
      estado:['',[Validators.required]]
    })
    
  if (this.data) {
    if (this.data.id) {
      this.editMode = true;
      this.currentId = this.data.id;
      this.formGroup.patchValue({
        titulo: this.data.titulo,
        descripcion: this.data.descripcion,
        recursoAfectado: this.data.recursoAfectado,
        estado: this.data.estado,
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
      /*this.submitted = true;

      if (this.formGroup.invalid) {
        console.error('Formulario inválido:', this.formGroup.errors);
        return;
      }*/
    
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
          next: () => {
            alert('El reporte fue editado exitosamente');
            this.reportUpdated.emit();
            this.dialogRef.close();
          },
          error: (err) => {
            console.error('Error al actualizar el reporte:', err);
          },
        });
      } else {
        // Crear nuevo reporte
        this.services.addReporte(reporte).subscribe({
          next: () => {
            alert('El reporte fue agregado exitosamente');
            this.reportUpdated.emit();
            this.dialogRef.close();
          },
          error: (err) => {
            console.error('Error al crear el reporte:', err);
          },
        });
      }
  }
}
