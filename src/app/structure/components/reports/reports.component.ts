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

@Component({
  selector: 'app-reports',
  imports: [TableComponent,MatIconModule,MatButtonModule,MatDialogModule,MatIconModule],
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
    this.reportList=data
   })
}

openDialog() {
  const dialogRef=this.dialog.open(DialogFormComponent,{
    autoFocus: false,
    disableClose: true,
    data:{component:ReportFormComponent}
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

  addReporte(reporte: Reporte){
    this.services.addReporte(reporte).subscribe(() => {
      this.getReport(); // Recarga la lista de usuarios
    });
  }
  updateUser(reporte: Reporte) {
    if (reporte.id) {
      this.services.updateReports(reporte.id, reporte).subscribe(() => {
        this.getReport(); // Actualiza la lista
      });
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
    
    const dialogRef = this.dialog.open(ReportFormComponent, {
      autoFocus: false,
      disableClose: true,
      data: reporte, 
      width: '2000px', 
      height: '50vh', 
    }); 

    dialogRef.afterClosed().subscribe(() => {
      this.getReport(); // Actualiza la tabla después de cerrar el diálogo
    });
  }
  
}
