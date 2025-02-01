import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../../../services/user-service/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { Usuario } from '../../../../models/user';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-form',
  imports: [MatFormFieldModule, MatCardModule, ReactiveFormsModule,
    MatLabel, MatInputModule, MatButtonModule, NgIf, NgFor,
    MatSelectModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  estados=[
    {label:'Activo',value:'Y'},
    {label:'Inactivo',value:'N'}
  ]
  formGroup!: FormGroup;
  isEditMode: boolean = false; // Para identificar si es edición o creación
  currentID?: number; // Usuario actual (si es edición)

  private formBuilder = inject(NonNullableFormBuilder);

  constructor(
    private services: UserService,
    private dialogRef: MatDialogRef<UserFormComponent>, // Referencia para cerrar el diálogo
    @Inject('formData')public formData:Usuario|null
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      // id: this.formBuilder.control<number | null>(null), // Campo opcional para manejar edición
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
      active:this.formBuilder.control('', {
        validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
      }),
    });

    // Si hay un usuario actual (para editar), llenamos el formulario
    // if (this.currentUser) {
    //   this.isEditMode = true;
    //   this.formGroup.patchValue(this.currentUser);
    // }
    if(this.formData){
      if(this.formData.id){
        this.isEditMode=true
        this.currentID = this.formData.id
        this.formGroup.setValue({
          cedula:this.formData.cedula,
          nombre:this.formData.nombre,
          apellido:this.formData.apellido,
          correo:this.formData.correo,
          telefono:this.formData.telefono,
          active:this.formData.active,
        })
        console.log(this.formData)
      }
      else{
        this.isEditMode=false
      }
    }
    else{
      this.isEditMode=false
    }
  }

  // Manejar el envío del formulario
  onSubmit() {
    this.submitted = true;
    const usuario: Usuario = {
      ...this.formGroup.value,
      id:this.isEditMode?this.currentID:undefined
    };

    if (this.isEditMode) {
      if(!this.currentID){
        return
      }
      // Actualizar usuario
      this.services.updateUser(this.currentID, usuario).subscribe({
        next: () => {
          console.log('Usuario actualizado correctamente');
          this.dialogRef.close(true); // Cierra el formulario y notifica éxito
        },
        error: (err) => console.error('Error al actualizar usuario', err),
      });
    } else {
      // Crear nuevo usuario
      usuario.active='Y';
      this.services.addUser(usuario).subscribe({
        next: () => {
          console.log('Usuario creado correctamente');
          console.log(usuario)
          this.dialogRef.close(true); // Cierra el formulario y notifica éxito
        },
        error: (err) => console.error('Error al crear usuario', err),
      });
    }
  }
  submitted= false;
  // Cancelar y cerrar el formulario
  onCancel() {
    this.dialogRef.close(); // Cierra el formulario sin realizar cambios
    this.submitted=false
  }
}