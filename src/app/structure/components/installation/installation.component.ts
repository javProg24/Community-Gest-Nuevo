import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { InstallationService } from '../../../services/installation-service/installation.service';
import { Installation } from '../../../models/instalation';
import { Accion, getEntityProperties } from '../../../models/tabla-columna';
import { TableComponent } from '../../shared/table/table.component';
import { DialogFormComponent } from '../../shared/dialog-form/dialog-form.component';
import { InstallationFormComponent } from './installation-form/installation-form.component';

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [
    TableComponent,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.css'] // Corregido: styleUrls en lugar de styleUrl
})
export class InstallationComponent implements OnInit {
  formGroup!: FormGroup;
  installList: Installation[] = [];
  columns: string[] = [];
  title = 'Instalaciones';

  constructor(
    private services: InstallationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getInstall();
  }

  getInstall() {
    this.columns = getEntityProperties('install');
    this.services.getInstall().subscribe((data) => {
      this.installList = data;
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Editar') {
      this.editar(accion.fila);
    } else if (accion.accion == 'Eliminar') {
      this.eliminar(accion.fila);
    }
  }

  eliminar(nombre: any) {
    console.log('eliminar', nombre);
  }

  editar(objeto: any) {
    console.log('editar', objeto);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      autoFocus: false,
      disableClose: true,
      data:{component:InstallationFormComponent},
      height:'500px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        console.log("Cerrar");
      }
    });
  }
}