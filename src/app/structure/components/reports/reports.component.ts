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

@Component({
  selector: 'app-reports',
  imports: [TableComponent,MatIconModule,MatButtonModule,MatDialogModule,MatIconModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit{
openDialog() {
  const dialogRef=this.dialog.open(DialogFormComponent,{
    autoFocus: false,
    disableClose: true,
    data:{component:ReportFormComponent}
  })
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    if (result) {
      console.log("Cerrar");
    }
  });
}
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
  onAction(accion:Accion){
    if(accion.accion=='Editar'){
      this.editar(accion.fila);
    }else if(accion.accion=='Eliminar'){
      this.eliminar(accion.fila);
    }
  }
  eliminar(nombre: any) {
    console.log('eliminar', nombre);
  }

  editar(objeto: any) {
    console.log('editar', objeto);
  }
}
