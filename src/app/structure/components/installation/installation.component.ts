import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { InstallationService } from '../../../services/installation-service/installation.service';
import { Instalacion } from '../../../models/instalation';
import { Accion, getEntityProperties } from '../../../models/tabla-columna';
import { TableComponent } from '../../shared/table/table.component';
import { DialogFormComponent } from '../../shared/dialog-form/dialog-form.component';
import { InstallationFormComponent } from './installation-form/installation-form.component';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [
    TableComponent,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.css'] // Corregido: styleUrls en lugar de styleUrl
})
export class InstallationComponent implements OnInit {
  installList: Instalacion[] = [];
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

  search(searchInput: HTMLInputElement): void {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      this.services.getInstallsSearch(searchTerm).subscribe((datos: Instalacion[]) => {
        this.installList = datos;
      });
    } else {
      this.getInstall();
    }
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Editar') {
      this.editar(accion.fila);
    } else if (accion.accion == 'Eliminar') {
      this.eliminar(accion.fila);
    }
  }

  eliminar(instalacion: Instalacion) {
  const dialogRef = this.dialog.open(DialogComponent,{
        data:{
          titulo: "Esta seguro de eliminar esta instalacion?",
        },
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result === true){
          if(instalacion.id !== undefined) {
            this.services.deleteInstall(instalacion.id, instalacion).subscribe(() => {
              alert("Instalacion eliminada exitosamente");
              this.getInstall();
            });
          } else {
              console.error("El instalacion no tiene un ID definido.");
            }
        } else{
          console.log("Eliminación cancelada");
        }
          
      })
  }

  editar(instalacion: Instalacion) {
    const dialogRef = this.dialog.open(DialogFormComponent, {
          autoFocus: false,
          disableClose: true,
          data: {
            component: InstallationFormComponent,
            formData:instalacion,
          }, 
        }); 
        
    dialogRef.afterClosed().subscribe(() => {
      this.getInstall();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      autoFocus: false,
      disableClose: true,
      data:{component:InstallationFormComponent},
      height:'500px'
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.getInstall();
    });
    this.getInstall();
  }
}