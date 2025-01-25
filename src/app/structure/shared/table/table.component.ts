import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NativeDateModule } from '@angular/material/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Accion } from '../../../models/tabla-columna';
import { EstadoTextoPipe } from "../../../pipe/estado-texto.pipe";
import { MatPaginator } from '@angular/material/paginator';
import { MatCell, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [MatIconModule,
    NativeDateModule,
    EstadoTextoPipe,
    MatPaginator, MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit{
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }
  title='';
  columns:string[]=[]
  dataSource:any[]=[]

  @Input()set titulo(title:any){
    this.title=title;
  }
  @Input()set columnas(columns:any[]){
    this.columns=columns;
  }
  @Input()set datos(data:any[]){
    this.dataSource=data;
  }
  @Output()action:EventEmitter<Accion>=new EventEmitter();
  onAction(accion:string, row?:any){
    this.action.emit({accion:accion,fila:row});
  }
}
