import { Component, inject, OnInit } from '@angular/core';
import { FormComponent } from "../../shared/form/form.component";
import { MatCard, MatCardModule } from '@angular/material/card';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPersonForm } from '../../../models/person.data';
import { IUserForm, Usuario } from '../../../models/user';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Accion, getEntityProperties } from '../../../models/tabla-columna';
import { UserService } from '../../../services/user-service/user.service';
import { TableComponent } from "../../shared/table/table.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormComponent } from '../../shared/dialog-form/dialog-form.component';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-user',
  imports: [
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TableComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  formGroup!: FormGroup;
  userList: Usuario[] = [];
  columns: string[] = [];
  title: string = 'Usuarios';

  private formBuilder = inject(NonNullableFormBuilder);

  constructor(private services: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      identity_card: this.formBuilder.control('', {
        validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
      }),
      dataPerson: this.formBuilder.group({
        name: this.formBuilder.control('', {
          validators: [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
        }),
        lastname: this.formBuilder.control('', {
          validators: [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
        }),
        email: this.formBuilder.control('', {
          validators: [Validators.required, Validators.email],
        }),
        phone: this.formBuilder.control('', {
          validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
        }),
      }),
    });

    this.getUsers();
  }

  // Obtener usuarios desde el backend
  getUsers() {
    this.columns = getEntityProperties('user'); // Configura las columnas para la tabla
    this.services.getUsers().subscribe((data) => {
      this.userList = data;
    });
  }

  // Manejar acciones de la tabla (Editar, Eliminar, Agregar)
  onAction(action: Accion<Usuario>) {
    if (action.accion === 'Editar') {
      if (action.fila) {
        this.updateUser(action.fila); // Actualizar usuario
      }
    } else if (action.accion === 'Eliminar') {
      if (action.fila && action.fila.id) {
        this.deleteUser(action.fila.id); // Eliminar usuario
      }
    } else if (action.accion === 'Agregar') {
      if (action.fila) {
        this.addUser(action.fila); // Agregar usuario
      }
    }
  }

  // Agregar usuario
  addUser(usuario: Usuario) {
    this.services.addUser(usuario).subscribe(() => {
      this.getUsers(); // Recarga la lista de usuarios
    });
  }

  // Actualizar usuario
  updateUser(usuario: Usuario) {
    if (usuario.id) {
      this.services.updateUser(usuario.id, usuario).subscribe(() => {
        this.getUsers(); // Actualiza la lista de usuarios
      });
    }
  }

  // Eliminar usuario
  deleteUser(id: number) {
    this.services.deleteUser(id).subscribe(() => {
      this.getUsers(); // Refresca los datos después de eliminar
    });
  }

  // Abrir diálogo para el formulario de usuario
  openDialog() {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      autoFocus: false,
      disableClose: true,
      data: { component: UserFormComponent },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        console.log("Cerrar");
      }
    });
  }
}