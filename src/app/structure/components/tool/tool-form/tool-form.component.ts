import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Herramienta } from '../../../../models/tool';
import { ToolService } from '../../../../services/tool-service/tool.service';


@Component({
  selector: 'app-tool-form',
  standalone:true,
  imports: [
    MatCardModule, MatLabel, ReactiveFormsModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatFormField, NgIf, NgFor,
    MatOptionModule,MatSelectModule],
  templateUrl: './tool-form.component.html',
  styleUrl: './tool-form.component.css'
})
export class ToolFormComponent implements OnInit{

  @Output() toolUpdated = new EventEmitter<void>();
  formGroup!:FormGroup
  editMode: boolean = false
  currentId?: number
  editId: string | null = null
  submitted= false
  toolList: Herramienta[] = []
  columns: string[] = []
  estados = [
    { value: 'activo', viewValue: 'Activo' },
    { value: 'inactivo', viewValue: 'Inactivo' },
    { value: 'pendiente', viewValue: 'Pendiente' }
  ];

  constructor(private fb:FormBuilder,public dialogRef:MatDialogRef<ToolFormComponent>,private services:ToolService,@Inject(MAT_DIALOG_DATA) public data: Herramienta | null){}

  ngOnInit(): void {
    this.formGroup=this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z\s]+$/)]],
      ubicacion:['',[Validators.required,Validators.minLength(3)]],
      descripcion: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
      cantidad:['',[Validators.required, Validators.min(1), Validators.max(100),Validators.pattern('^[0-9]*$')]],
      disponibilidad:['',[Validators.required]]
    })

    if (this.data) {
      if (this.data.id) {
        this.editMode = true;
        this.currentId = this.data.id;
        this.formGroup.patchValue({
          nombre: this.data.nombre,
          ubicacion: this.data.ubicacion,
          descripcion: this.data.descripcion,
          cantidad: this.data.cantidad,
          disponibilidad: this.data.disponibilidad,
        });
      } else {
        this.editMode = false;
      }
    } else {
      this.editMode = false;
    }
  }

  close() {
    this.dialogRef.close();
    this.submitted = false;
  }
  
  onSubmit() {
    this.submitted = true;
    
    if (this.formGroup.invalid) {
      console.error('Formulario inválido:', this.formGroup.errors);
      return;
    }
    
    console.log(this.formGroup.value);

    const herramienta: Herramienta = {
      ...this.formGroup.value, 
      id: this.editMode ? this.currentId : undefined,
    };
        
    if (this.editMode) {
      if (!this.currentId) {
        console.error('ID faltante para la actualización');
        return;
      }
        
      this.services.updateTool(this.currentId, herramienta).subscribe({
        next: () => {
          alert('La herramienta fue editado exitosamente');
          this.toolUpdated.emit();
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Error al actualizar la herramienta:', err);
        },
      });
    } else {
      this.services.addTool(herramienta).subscribe({
        next: () => {
          alert('La herramienta fue agregado exitosamente');
          this.toolUpdated.emit();
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Error al crear la herramienta:', err);
        },
      });
    }
  }
}
