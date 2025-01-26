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

  notification: { message: string; type: 'info' | 'success' | 'error' | 'warning'  } = {
    message: '',
    type: 'info'
  };  reportList:Reporte[]=[]
  columns:string[]=[]
  title='Reportes'
  constructor(private dialog:MatDialog,private services:ReportService) { }
  ngOnInit(): void {
    this.getReport()
  }
getReport(){
  this.columns=getEntityProperties('reporte')
  this.services.getReport().subscribe((data)=>{
    console.log('Datos recibidos:', data); 
    this.reportList=data
   })
}

search(searchInput: HTMLInputElement): void {
  const searchTerm = searchInput.value.trim(); 

  if (searchTerm) {
    this.services.getReportesSearch(searchTerm).subscribe((datos: Reporte[]) => {
      this.reportList = datos; 
    });
  } else {
    this.getReport();
  }
}

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
    this.getReport(); 
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
     if (reporte.id !== undefined) {
      this.services.deleteReports(reporte.id, reporte).subscribe(() => {
      // alert("Reporte eliminado exitosamente");
      this.notification={message:'El reporte ha sido elimado',type:'warning'}
      this.getReport();
  });
    } else {
      console.error("El reporte no tiene un ID definido.");
    }
    })
    setTimeout(()=>{
      this.notification={message:'',type:'info'}
    },1500)
  }
  editar(reporte: Reporte) {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      autoFocus: false,
      disableClose: true,
      data: {
        component: ReportFormComponent,
        formData:reporte,
      }, 
    }); 
    dialogRef.afterClosed().subscribe(() => {
      this.getReport(); 
    });
  }
}
