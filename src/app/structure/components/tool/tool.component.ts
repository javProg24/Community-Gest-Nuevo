import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from "../../shared/table/table.component";
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Herramienta } from '../../../models/tool';
import { ToolService } from '../../../services/tool-service/tool.service';
import { Accion, getEntityProperties } from '../../../models/tabla-columna';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ToolFormComponent } from './tool-form/tool-form.component';
import { DialogFormComponent } from '../../shared/dialog-form/dialog-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-tool',
  imports: [TableComponent,MatButtonModule,MatIconModule,MatFormFieldModule],
  templateUrl: './tool.component.html',
  styleUrl: './tool.component.css'
})
export class ToolComponent implements OnInit{
openDialog() {
  const dialogRef = this.dialog.open(DialogFormComponent,{
    autoFocus: false,
    disableClose: true,
    data:{component:ToolFormComponent}
  })
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    if (result) {
      console.log("Cerrar");
    }
  });
}
  formGroup!:FormGroup
  toolList:Herramienta[]=[]
  columns:string[]=[]
  title:string='Herramientas'
  private formBuilder=inject(NonNullableFormBuilder)
  constructor(private services:ToolService,private dialog:MatDialog) { }
  ngOnInit(): void {
    this.getTools();
  }
  getTools(){
    this.columns=getEntityProperties('tool')
    this.services.getTools().subscribe((data)=>{
      this.toolList=data
    })
  }
  onAction(accion:Accion){
    if(accion.accion=='Editar'){
      this.editar(accion.fila);
    }
    else if(accion.accion=='Eliminar'){
      this.eliminar(accion.fila);
    }
  }
  eliminar(nombre:any){
    console.log('eliminar',nombre)
  }
  editar(objeto:any){
    console.log('editar',objeto)
  }
}
