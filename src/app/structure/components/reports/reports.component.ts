import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../shared/table/table.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReportService } from '../../../services/report-service/report.service';
import { Accion, getEntityProperties } from '../../../models/tabla-columna';
import { DialogFormComponent } from '../../shared/dialog-form/dialog-form.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { Reporte } from '../../../models/report';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reports',
  imports: [TableComponent, MatIconModule, MatButtonModule, MatDialogModule, MatIconModule, MatFormField, MatLabel, MatFormFieldModule, MatInputModule], //puse MatFormField y MatLabel
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit{
  reportList:Reporte[]=[]
  columns:string[]=[]
  title='Reportes'
  constructor(private dialog:MatDialog,private services:ReportService) { }
  ngOnInit(): void {
    this.getReport()
  }
getReport(){
  this.columns=getEntityProperties('reporte')
  this.services.getReport().subscribe((data)=>{
    console.log('Datos recibidos:', data); // Verifica si llegan los datos
    this.reportList=data
   })
}

search(searchInput: HTMLInputElement): void {
  const searchTerm = searchInput.value.trim();  // Obtener el término de búsqueda

  if (searchTerm) {
    // Si hay un término de búsqueda, se filtra por título y recursoAfectado
    this.services.getReportesSearch(searchTerm).subscribe((datos: Reporte[]) => {
      this.reportList = datos;  // Actualiza la lista de reportes filtrados
    });
  } else {
    // Si el campo de búsqueda está vacío, recarga todos los reportes
    this.getReport();
  }
}
/*
search(searchInput: HTMLInputElement): void {
  const searchValue = searchInput.value.trim(); // Elimina espacios innecesarios
  if (searchValue) {
    this.services.getReportesSearch({ titulo: searchValue }).subscribe((datos: Reporte[]) => {
      this.reportList = datos; // Actualiza la lista con los datos filtrados
    });
  } else {
    this.getReport(); // Si no hay valor en el input, carga todos los reportes
  }
}
*/

openDialog() {
  const dialogRef=this.dialog.open(DialogFormComponent,{
    autoFocus: false,
    disableClose: true,
    data:{
      component:ReportFormComponent,
      formData:null
    }
  })
  dialogRef.afterClosed().subscribe(() => {
    this.getReport(); // Actualizar la tabla después de cerrar el diálogo
  });
}
  onAction(accion:Accion){
    if(accion.accion=='Editar'){
      this.editar(accion.fila);
    }else if(accion.accion=='Eliminar'){
      this.eliminar(accion.fila);
    }
  }
  eliminar(reporte: Reporte) {
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{
        titulo: "Esta seguro de eliminar el reporte?",
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      /*if (result){
        this.services.deleteReports(reporte.id,reporte).subscribe(()=>{
          alert("Reporte eliminado exitosamente")
          this.getReport();
        });
      }*/
     if (reporte.id !== undefined) {
  this.services.deleteReports(reporte.id, reporte).subscribe(() => {
    alert("Reporte eliminado exitosamente");
    this.getReport();
  });
} else {
  console.error("El reporte no tiene un ID definido.");
}
    })
  }
  editar(reporte: Reporte) {
    
    const dialogRef = this.dialog.open(DialogFormComponent, {
      autoFocus: false,
      disableClose: true,
      data: {
        component: ReportFormComponent,
        formData:reporte
      }, 
    }); 
    

    dialogRef.afterClosed().subscribe(() => {
      this.getReport(); // Actualiza la tabla después de cerrar el diálogo
    });
  }
  
}
