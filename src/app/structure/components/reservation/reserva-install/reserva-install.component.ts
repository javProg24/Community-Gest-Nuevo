import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../../services/user-service/user.service';
import { HorarioService } from '../../../../services/horario-service/horario.service';
import { InstallationService } from '../../../../services/installation-service/installation.service';
import { MatTabsModule } from '@angular/material/tabs';
import { TableComponent } from "../../../shared/table/table.component";
import { Reservation_Install } from '../../../../models/reservation';
import { Accion, getEntityProperties } from '../../../../models/tabla-columna';
import { ReservationService } from '../../../../services/reservation-service/reservation.service';
@Component({
  selector: 'app-reserva-install',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule,
    MatDatepickerModule, MatInputModule,
    MatCheckboxModule, MatSelectModule, MatOptionModule,
    NgFor, MatNativeDateModule, MatFormField, MatTimepickerModule, 
    MatButtonModule, MatTabsModule, TableComponent],
  templateUrl: './reserva-install.component.html',
  styleUrl: './reserva-install.component.css'
})
export class ReservaInstallComponent implements OnInit{
onAction($event: Accion<any>) {
throw new Error('Method not implemented.');
}
  installList: Reservation_Install[] = [];
  columns: string[] = [];
  title = 'Instalaciones';
close() {
throw new Error('Method not implemented.');
}
getReserIn(){
  this.columns=getEntityProperties('reserva_Install')
  this.instalser.getReserva_Ins().subscribe((data)=>{
    this.installList=data;
  })
}
onSubmit() {
throw new Error('Method not implemented.');
}
  users: { id?: number; concatenated: string }[] = [];
  formGroup!:FormGroup;
  installations: { id?: number; attributeValue: string }[] = [];
  horarioSeleccionado: string | null = null;
  constructor(private fb:FormBuilder,private service:UserService,
    private services:HorarioService,private instalser:ReservationService,
    private serviHor:InstallationService
  ){}
  items=[
    {value:'reservada',label:'Reservada'},
    {value:'finalizada',label:'Finalizada'},
  ]
  ngOnInit(): void {
    this.formGroup=this.fb.group({
          usuario:['',[Validators.required,]],
          instalacion:['',[Validators.required,]],
          fecha:['',[Validators.required,]],
          estado:['',[Validators.required,]],
        })
    this.loadUsers()
    this.loadInstallations()
    this.getReserIn()
  }
  loadUsers(): void {
    this.service.getUserNameWithID().subscribe(
      (data) => {
        this.users = data; // Asignar los datos obtenidos a la variable users
      },
      (error) => {
        console.error('Error al cargar usuarios', error);
      }
    );
  }
  loadInstallations() {
    this.services.getInstallationNamesWithId().subscribe(
      (data) => {
        this.installations = data; // Asignar las instalaciones obtenidas
      },
      (error) => {
        console.error('Error al cargar instalaciones', error);
      }
    );
  }

  loadHorarios(instalacionID:number){
    this.serviHor.getHorario(instalacionID).subscribe(
      (horario)=>{
        this.horarioSeleccionado=horario
      },
      (error)=>{
        console.error('Error al cargar horarios', error);
      }
    )
  }
}
