import { CommonModule, NgFor } from '@angular/common';
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
import { UserService } from '../../../../services/user-service/user.service';
import { InstallationService } from '../../../../services/installation-service/installation.service';
import { TableComponent } from "../../../shared/table/table.component";
import { Reserva_Instalacion } from '../../../../models/reservation';
import { Accion, getEntityProperties } from '../../../../models/tabla-columna';
import { ReservationService } from '../../../../services/reservation-service/reservation.service';
import { MatTableDataSource, MatTableModule} from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { Usuario } from '../../../../models/user';
import { Instalacion } from '../../../../models/instalation';
import { map } from 'rxjs';
@Component({
  selector: 'app-reserva-install',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule,
    MatDatepickerModule, MatInputModule, MatPaginatorModule,
    MatCheckboxModule, MatSelectModule, MatOptionModule,
    NgFor, MatNativeDateModule, MatFormField, MatTimepickerModule,
    MatButtonModule, MatTabsModule, MatTableModule, CommonModule,
    MatIconModule, MatButtonModule, MatTableModule],
  templateUrl: './reserva-install.component.html',
  styleUrl: './reserva-install.component.css'
})
export class ReservaInstallComponent implements OnInit{
  dataSource=new MatTableDataSource<Reserva_Instalacion>();
  isEdit:boolean=false;
  currentId!:number;
  formGroup!:FormGroup;
  horaInicioSeleccionada: string = '';
  diaSeleccionado: string = '';
  horario(event:any) {
    const instalacionSeleccionada = event.value; // Obtiene el objeto completo seleccionado
        this.horaInicioSeleccionada = `${instalacionSeleccionada?.horaInicio} - ${instalacionSeleccionada?.horaFin}`;
        this.diaSeleccionado = instalacionSeleccionada?.dia;
  }
  usuarios!:Usuario[];
  instalaciones!:Instalacion[];
  items=[
    {value:'Reservada',label:'Reservada'},
    {value:'Finalizada',label:'Finalizada'},
  ]
  installList: any[] = [];
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
          dia:['',[Validators.required,]],
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
    this.instSer.getInstall().subscribe((data:Instalacion[])=>{
      this.instalaciones=data;
      // console.log(this.instalaciones);
    })
  }
    getReserIn(){
      this.columns=getEntityProperties('reserva_Install')
      // this.instalser.getReserva_Ins().subscribe(
      //   (data:Reserva_Instalacion[])=>{
      //     this.installList=data.map((r:Reserva_Instalacion)=>({
      //       id:r.id,
      //       usuario:r.usuario?.nombre,
      //       instalacion:r.instalacion?.nombre,
      //       dia:r.instalacion?.dia,
      //       horaInicio:r.instalacion?.horaInicio,
      //       horaFin:r.instalacion?.horaFin,
      //       fecha:r.fecha,
      //       disponibilidad:r.disponibilidad,
      //     }));
      // })
      this.instalser.getReserva_Ins().subscribe((data:Reserva_Instalacion[])=>{
        this.dataSource.data=data;
      })
    }
  onSubmit() {
    throw new Error('Method not implemented.');
  }  
  
  onAction(accion: Accion) {
    if(accion.accion == 'Editar'){
      this.editar(accion.fila);
    }
    else if(accion.accion == 'Eliminar'){
      this.eliminar(accion.fila.id);
    }
  }
  selectedTab:number=0;
  editar(objeto: Reserva_Instalacion) {
    console.log("editar", objeto);
    if(objeto&&objeto.id){
      this.currentId=objeto.id;
      this.isEdit=true;
      this.selectedTab=0;
    }else{
      console.log("No se puede editar");
    }
    let usuarioSeleccionado =this.usuarios.find((u)=>u.id==objeto.usuario_ID);
    let instalacionSeleccionada =this.instalaciones.find((i)=>i.id==objeto.instalacion_ID);
    console.log(usuarioSeleccionado,instalacionSeleccionada);
    this.formGroup.setValue({
      usuario:usuarioSeleccionado,
      instalacion:instalacionSeleccionada,
      dia:objeto.instalacion?.dia,
      horario:`${objeto.instalacion?.horaInicio} - ${objeto.instalacion?.horaFin}`,
      fecha:objeto.fecha,
      estado:objeto.disponibilidad,
    })
  }
  
  eliminar(id: any) {
    console.log("eliminar",id);
  }
}
