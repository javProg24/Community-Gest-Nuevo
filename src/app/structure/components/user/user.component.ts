import { Component, inject, OnInit } from '@angular/core';
import { FormComponent } from "../../shared/form/form.component";
import { MatCard, MatCardModule } from '@angular/material/card';
import { FormGroup, NgModel, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { DialogFormComponent } from '../../shared/dialog-form/dialog-form.component'
import { FormsModule } from '@angular/forms'; // Importa FormsModule;
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-user',
  standalone: true, // Componente independiente
  imports: [
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TableComponent,
    FormsModule, // Agregado para manejar [(ngModel)]
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  formGroup!: FormGroup;
  userList: Usuario[] = []; // Lista completa de usuarios
  filteredUserList: Usuario[] = []; // Lista filtrada para mostrar en la tabla
  columns: string[] = [];
  title: string = 'Usuarios';
  searchText: string = ''; // Campo de búsqueda

  private formBuilder = inject(NonNullableFormBuilder);

  constructor(private services: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      cedula: this.formBuilder.control('', {
        validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
      }),
      dataPerson: this.formBuilder.group({
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
      }),
    });

    this.getUsers();
  }

  // Obtener usuarios desde el backend
  getUsers() {
    this.columns = getEntityProperties('user'); // Configura las columnas para la tabla
    this.services.getUsers().subscribe((data) => {
      this.userList = data;
      this.filteredUserList = [...this.userList]; // Inicializa la lista filtrada
    });
  }

  // Filtrar usuarios según el texto ingresado
  filterUsers() {
    const search = this.searchText.toLowerCase();
    this.filteredUserList = this.userList.filter((user) =>
      user.nombre.toLowerCase().includes(search) ||
      user.apellido.toLowerCase().includes(search) ||
      user.cedula.toLowerCase().includes(search) ||
      user.correo.toLowerCase().includes(search) ||
      user.telefono.includes(search)
    );
  }

  // Manejar acciones de la tabla (Editar, Eliminar)
  onAction(action: Accion) {
    if (action.accion == 'Editar') {
      this.updateUser(action.fila); // Actualizar usuario
    } else if (action.accion == 'Eliminar') {
      this.deleteUser(action.fila.id); // Eliminar usuario
      console.log(action.fila.id);
    }
  }

  // Actualizar usuario
  updateUser(usuario: Usuario) {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      autoFocus: false,
      disableClose: true,
      data: {
        component: UserFormComponent,
        formData: usuario
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  // Eliminar usuario
  deleteUser(id: number) {
    this.services.desactiveUsuario(id).subscribe(() => {
      console.log(id);
      this.getUsers(); // Refresca los datos después de eliminar
    });
  }

  // Abrir diálogo para el formulario de usuario
  openDialog() {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      autoFocus: false,
      disableClose: true,
      data: { component: UserFormComponent, formData: null },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.getUsers();
      }
    });
  }
}