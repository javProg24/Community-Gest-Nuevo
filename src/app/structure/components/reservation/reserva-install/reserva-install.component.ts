import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { TableComponent } from "../../../shared/table/table.component";
import { Reservation_Install } from '../../../../models/reservation';
import { Accion, getEntityProperties } from '../../../../models/tabla-columna';
import { ReservationService } from '../../../../services/reservation-service/reservation.service';
import { MatHeaderRow, MatRow, MatTableDataSource, MatTableModule} from '@angular/material/table'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { Usuario } from '../../../../models/user';
import { Installation } from '../../../../models/instalation';
@Component({
  selector: 'app-reserva-install',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule,
    MatDatepickerModule, MatInputModule, MatPaginatorModule,
    MatCheckboxModule, MatSelectModule, MatOptionModule,
    NgFor, MatNativeDateModule, MatFormField, MatTimepickerModule,
    MatButtonModule, MatTabsModule, MatTableModule, CommonModule,
    MatIconModule, MatButtonModule, TableComponent],
  templateUrl: './reserva-install.component.html',
  styleUrl: './reserva-install.component.css'
})
export class ReservaInstallComponent implements OnInit{
  formGroup!:FormGroup;
  horaInicioSeleccionada: string = '';
  horario(event:any) {
    const instalacionSeleccionada = event.value; // Obtiene el objeto completo seleccionado
        this.horaInicioSeleccionada = `${instalacionSeleccionada?.horaInicio} - ${instalacionSeleccionada?.horaFin}`;
  }
  usuarios!:Usuario[];
  instalaciones!:Installation[];
  items=[
    {value:'reservada',label:'Reservada'},
    {value:'finalizada',label:'Finalizada'},
  ]
  installList: Reservation_Install[] = [];
  columns: string[] = [];
  title = 'Instalaciones';
  constructor(private fb:FormBuilder,
    private instalser:ReservationService,
    private userSer:UserService,
    private instSer:InstallationService,
  ){}
  ngOnInit(): void {
    this.formGroup=this.fb.group({
          usuario:['',[Validators.required,]],
          instalacion:['',[Validators.required,]],
          horario:['',[Validators.required,]],
          fecha:['',[Validators.required,]],
          estado:['',[Validators.required,]],
        })
    this.getReserIn()
    this.getUser()
    this.getInstalacion()
  }
  getUser(){
    this.userSer.getUsers().subscribe((data:Usuario[])=>{
      this.usuarios=data;
    })
  }
  getInstalacion(){
    this.instSer.getInstall().subscribe((data:Installation[])=>{
      this.instalaciones=data;
      // console.log(this.instalaciones);
    })
  }
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
  
  onAction(accion: Accion) {
    if(accion.accion === 'Editar'){
      this.editar(accion.fila);
    }
    else if(accion.accion === 'Eliminar'){
      this.eliminar(accion.fila.id);
    }
  }
  editar(obejto: any) {
    console.log("editar",obejto);
  }
  eliminar(id: any) {
    console.log("eliminar",id);
  }
}
