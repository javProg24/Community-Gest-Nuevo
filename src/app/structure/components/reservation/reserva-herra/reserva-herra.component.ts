import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule, provideNativeDateAdapter} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { ReservationService } from '../../../../services/reservation-service/reservation.service';
import { UserService } from '../../../../services/user-service/user.service';
import { ToolService } from '../../../../services/tool-service/tool.service';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatButtonModule } from '@angular/material/button';
import { TableComponent } from '../../../shared/table/table.component';
import { MatTabsModule } from '@angular/material/tabs';
import { Accion, getEntityProperties } from '../../../../models/tabla-columna';
import { Reserva_Herr } from '../../../../models/reservation';
@Component({
  selector: 'app-reserva-herra',
  standalone: true,
  imports: [MatCardModule,ReactiveFormsModule,MatFormFieldModule,
    MatDatepickerModule,MatInputModule,
    MatCheckboxModule,MatSelectModule,MatOptionModule,
    NgFor,MatNativeDateModule,MatFormField,MatTimepickerModule,MatButtonModule,TableComponent,
    MatTabsModule
  
  ],
  templateUrl: './reserva-herra.component.html',
  styleUrl: './reserva-herra.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservaHerraComponent implements OnInit{
  title:string = 'Reservas de Herramientas'
  HerrllList:Reserva_Herr[]=[]
  columns: string[] = [];
  
  onAction($event: Accion<any>) {
    throw new Error('Method not implemented.');
  }
  close() {
  throw new Error('Method not implemented.');
  }
  getReseHer(){
    this.columns=getEntityProperties('reserva_Herra')
    this.herrser.getReserva_Her().subscribe((data)=>{
      this.HerrllList=data
    })
  }
  constructor(private service:UserService,private serviceHe:ToolService,private fb:FormBuilder,
    private herrser:ReservationService
  ){}
  ngOnInit(): void {
    this.formGroup=this.fb.group({
      usuario:['',[Validators.required,]],
      herramienta:['',[Validators.required,]],
      fecha:['',[Validators.required,]],
      estado:['',[Validators.required,]],
      hora_Inicio:['',[Validators.required,]],
      hora_Fin:['',[Validators.required,]]
    })
    // this.loadUsers();
    // this.loadHerr()
    this.getReseHer()
  }
  users: { id?: number; concatenated: string }[] = [];
  herrs: { id?: number; attributeValue: string }[] = [];
  items=[
    {value:'reservada',label:'Reservada'},
    {value:'finalizada',label:'Finalizada'},
  ]
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  formGroup!:FormGroup;
  // loadUsers(): void {
  //   this.service.getUserNameWithID().subscribe(
  //     (data) => {
  //       this.users = data; // Asignar los datos obtenidos a la variable users
  //     },
  //     (error) => {
  //       console.error('Error al cargar usuarios', error);
  //     }
  //   );
  // }
  // loadHerr(){
  //   this.serviceHe.getHerramWithID().subscribe(
  //     (data) => {
  //       this.herrs = data; // Asignar las instalaciones obtenidas
  //     },
  //     (error) => {
  //       console.error('Error al cargar instalaciones', error);
  //     }
  //   );
  // }
}
