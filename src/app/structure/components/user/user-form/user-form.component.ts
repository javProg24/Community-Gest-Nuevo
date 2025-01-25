import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from "../../../shared/form/form.component";
import { UserService } from '../../../../services/user-service/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { Usuario } from '../../../../models/user';
import { Accion, getEntityProperties } from '../../../../models/tabla-columna';
import { DialogFormComponent } from '../../../shared/dialog-form/dialog-form.component';

@Component({
  selector: 'app-user-form',
  imports: [MatFormFieldModule, MatCardModule, ReactiveFormsModule,
    MatLabel, MatInputModule, FormComponent,MatButtonModule,NgIf],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  formGroup!: FormGroup;
  isEditMode: boolean = false; // Para identificar si es edición o creación
  currentUser?: Usuario; // Usuario actual (si es edición)

  private formBuilder = inject(NonNullableFormBuilder);

  constructor(
    private services: UserService,
    private dialogRef: MatDialogRef<UserFormComponent> // Referencia para cerrar el diálogo
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: this.formBuilder.control<number | null>(null), // Campo opcional para manejar edición
      cedula: this.formBuilder.control('', {
        validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
      }),
      nombre: this.formBuilder.control('', {
        validators: [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
      }),
      apellido: this.formBuilder.control('', {
        validators: [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
      }),
      correo: this.formBuilder.control('', {
        validators: [Validators.required, Validators.email],
      }),
      telefono: this.formBuilder.control('', {
        validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
      }),
    });

    // Si hay un usuario actual (para editar), llenamos el formulario
    if (this.currentUser) {
      this.isEditMode = true;
      this.formGroup.patchValue(this.currentUser);
    }
  }

  // Manejar el envío del formulario
  onSubmit() {
    const usuario: Usuario = this.formGroup.value;

    if (this.isEditMode && usuario.id) {
      // Actualizar usuario
      this.services.updateUser(usuario.id, usuario).subscribe({
        next: () => {
          console.log('Usuario actualizado correctamente');
          this.dialogRef.close(true); // Cierra el formulario y notifica éxito
        },
        error: (err) => console.error('Error al actualizar usuario', err),
      });
    } else {
      // Crear nuevo usuario
      this.services.addUser(usuario).subscribe({
        next: () => {
          console.log('Usuario creado correctamente');
          this.dialogRef.close(true); // Cierra el formulario y notifica éxito
        },
        error: (err) => console.error('Error al crear usuario', err),
      });
    }
  }

  // Cancelar y cerrar el formulario
  onCancel() {
    this.dialogRef.close(false); // Cierra el formulario sin realizar cambios
  }
}