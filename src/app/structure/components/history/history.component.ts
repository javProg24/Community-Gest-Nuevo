import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ReservationService } from '../../../services/reservation-service/reservation.service';
import { getEntityProperties } from '../../../models/tabla-columna';
import { Reserva_Herr, Reserva_Instalacion } from '../../../models/reservation';
import { TableComponent } from "../../shared/table/table.component";
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-history',
  imports: [MatTabsModule,
    TableComponent, MatLabel,
    ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule, MatNativeDateModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit{
  form!: FormGroup;

  columns: string[] = [];
  title = 'Instalaciones';
  installList: Reserva_Instalacion[] = [];
  herrList:Reserva_Herr[]=[];
  constructor(private reservaService:ReservationService,private fb:FormBuilder,){
  }
  ngOnInit(): void {
    this.form=this.fb.group({
      Nombre_Apellido_Instalacion:[""],
    })
    this.getReserIn()
  }
  getReserIn(){
    this.columns=getEntityProperties('reserva_Install')
        this.reservaService.getReserva_Ins_Fi().subscribe(data=>{
          this.installList=data;
    })
  }
  getReserHerr(){
    this.columns=getEntityProperties('reserva_Herra')
    this.reservaService.getReserva_Herr_Fi().subscribe(data=>{
      this.herrList=data
    })
  }
  search_Inst(input: HTMLInputElement) {
    const searchQuery = input.value.trim();
    if (searchQuery) {
      this.reservaService.searchReserva_Ins_Fi(
        { instalacion: searchQuery }
      ).subscribe(
        (datos: Reserva_Instalacion[]) => {
          this.installList = datos; // Actualizar la lista con los datos recibidos
        }
      );
    }
    else{
      this.getReserIn()
    }
  }
  search_Apellido(input: HTMLInputElement) {
    const searchQuery = input.value.trim();
    if (searchQuery) {
      this.reservaService.searchReserva_Ins_Fi(
        { apellido: searchQuery }
      ).subscribe(
        (datos: Reserva_Instalacion[]) => {
          this.installList = datos; // Actualizar la lista con los datos recibidos
        }
      );
    }
    else{
      this.getReserIn()
    }
  }
  search_Nombre(input: HTMLInputElement) {
    const searchQuery = input.value.trim();
    
    // Verificar si se ingresó algo
    if (searchQuery) {
      this.reservaService.searchReserva_Ins_Fi(
        { nombre: searchQuery }
      ).subscribe(
        (datos: Reserva_Instalacion[]) => {
          this.installList = datos; // Actualizar la lista con los datos recibidos
        }
      );
    }
    else{
      this.getReserIn()
    }
  }
}
