import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../shared/table/table.component";
import { Herramienta } from '../../../models/tool';
import { ToolService } from '../../../services/tool-service/tool.service';
import { Accion, getEntityProperties } from '../../../models/tabla-columna';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ToolFormComponent } from './tool-form/tool-form.component';
import { DialogFormComponent } from '../../shared/dialog-form/dialog-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tool',
  imports: [TableComponent,MatButtonModule,MatIconModule,MatFormFieldModule,MatInputModule],
  templateUrl: './tool.component.html',
  styleUrl: './tool.component.css'
})
export class ToolComponent implements OnInit{

  toolList:Herramienta[]=[]
  columns:string[]=[]
  title:string='Herramientas'

  constructor(private services:ToolService,private dialog:MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogFormComponent,{
      autoFocus: false,
      disableClose: true,
      data:{component:ToolFormComponent}
    })
    dialogRef.afterClosed().subscribe(() => {
      this.obtener();
    });
  }

  ngOnInit(): void {
    this.obtener();
  }

  onAction(accion:Accion){
    if(accion.accion=='Editar'){
      this.editar(accion.fila);
    }
    else if(accion.accion=='Eliminar'){
      this.eliminar(accion.fila);
    }
  }

  obtener(){
    this.columns=getEntityProperties('tool')
    this.services.getTools().subscribe((data)=>{
      this.toolList=data
    })
  }

  crear(herramienta: Herramienta){
    this.services.addTool(herramienta).subscribe(() => {
      this.obtener();
    });
  }

  actualizar(herramienta: Herramienta) {
    if (herramienta.id) {
      this.services.updateTool(herramienta.id, herramienta).subscribe(() => {
      this.obtener();
      });
    }
  }

  eliminar(herramienta: Herramienta){
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{
        titulo: "Esta seguro de eliminar esta herramienta?",
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if( result === true){
        if(herramienta.id !== undefined) {
          this.services.deleteTool(herramienta.id, herramienta).subscribe(() => {
            alert("Herramienta eliminado exitosamente");
            this.obtener();
          });
        } else {
            console.error("El herramienta no tiene un ID definido.");
          }
      } else{
        console.log("Eliminación cancelada");
      }
        
    })
  }

  editar(herramienta: Herramienta){
    const dialogRef = this.dialog.open(ToolFormComponent, {
      autoFocus: false,
      disableClose: true,
      data: herramienta, 
      width: '2000px', 
      height: '50vh', 
      }); 
    
    dialogRef.afterClosed().subscribe(() => {
      this.obtener();
      });
  }

  buscar(searchInput: HTMLInputElement): void {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      this.services.getToolsSearch(searchTerm).subscribe((datos: Herramienta[]) => {
        this.toolList = datos;
      });
    } else {
      this.obtener();
    }
  }
}
