import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogFormComponent } from '../../shared/dialog-form/dialog-form.component';
import { TimetableformComponent } from './timetableform/timetableform.component';
import { MatDialog } from '@angular/material/dialog';
import { HorarioService } from '../../../services/horario-service/horario.service';
import { TableComponent } from "../../shared/table/table.component";
import { Accion, getEntityProperties } from '../../../models/tabla-columna';
import { Timetable } from '../../../models/timetable';

@Component({
  selector: 'app-timetable',
  imports: [MatIconModule, MatButtonModule, TableComponent],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.css'
})
export class TimetableComponent implements OnInit{
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
title= 'Horarios';
columns: string[]=[];
HorariotList: Timetable[]=[];
  constructor(private dialog:MatDialog,private services:HorarioService) { }
  ngOnInit(): void {
    this.gerHorario()
  }
  gerHorario(){
    this.columns=getEntityProperties('horario')
    // this.services.getHorario().subscribe((data) => {
    //   this.HorariotList = data;
    // })
    this.services.getHorario_Instal().subscribe((data)=>{
      this.HorariotList=data
    })
  }
openDialog() {
  const dialogRef=this.dialog.open(TimetableformComponent,{
      autoFocus: false,
      disableClose: true,
      data:{component:TimetableformComponent}
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        console.log("Cerrar");
      }
    });
}

}
