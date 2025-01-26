import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ReservationService } from '../../../services/reservation-service/reservation.service';
import { getEntityProperties } from '../../../models/tabla-columna';
import { Reserva_Instalacion } from '../../../models/reservation';
import { TableComponent } from "../../shared/table/table.component";
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-history',
  imports: [MatTabsModule,
    TableComponent, MatLabel,
    ReactiveFormsModule, MatFormFieldModule, MatDatepicker,
    MatDatepickerInput,MatInputModule,
    MatDatepickerModule, MatNativeDateModule,],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit{
form!: FormGroup;
// Método para buscar por Nombre y Apellidos
searchByName(nombre_Apellido: string) {
  // this.reservaService.searchReserva_Ins(nombre_Apellido).subscribe(data => {
  //   // Manejar los resultados de la búsqueda
  //   console.log('Resultados de búsqueda por nombre:', nombre_Apellido);
  // });
}


// Método para buscar por Fecha
// searchByDate(fecha: Date) {
//   this.reservaService.searchReserva_Ins(undefined).subscribe(data => {
//     // Manejar los resultados de la búsqueda
//     console.log('Resultados de búsqueda por fecha:', data);
//   });
// }

  columns: string[] = [];
  title = 'Instalaciones';
  installList: Reserva_Instalacion[] = [];
  constructor(private reservaService:ReservationService,){
  }
  ngOnInit(): void {
    
    this.getReserIn()
  }
  getReserIn(){
    this.columns=getEntityProperties('reserva_Install')
        this.reservaService.getReserva_Ins_Fi().subscribe(data=>{
          this.installList=data;
    })
  }
}
