import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatFormField, MatError } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
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
import { NotificationComponent } from "../../../shared/notification/notification.component";
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-reserva-install',
  standalone:true,
  imports: [MatCardModule,
    ReactiveFormsModule, MatFormFieldModule,
    MatDatepickerModule, MatInputModule,
    MatPaginatorModule, MatCheckboxModule,
    MatSelectModule, MatOptionModule,
    NgFor, MatNativeDateModule,
    MatFormField, MatTimepickerModule,
    MatButtonModule, MatTabsModule,
    MatTableModule, CommonModule,
    MatIconModule, MatButtonModule,
    MatTableModule, TableComponent,
    NotificationComponent, NgIf,
    MatDatepicker,MatError,MatInputModule,],
  templateUrl: './reserva-install.component.html',
  styleUrl: './reserva-install.component.css',
  providers:[DatePipe]
})
export class ReservaInstallComponent implements OnInit{
  
  search(nombre_Apellido?:string,fecha?:Date){
    if(nombre_Apellido||fecha){
      
      this.reservaService.searchReserva_Ins(nombre_Apellido)
      .subscribe((datos:Reserva_Instalacion[])=>{
        this.installList=datos
      })
    }
    else{
      this.getReserIn()
      this.notification={message:'La reserva no se encuentra o el usuario',type:'error'}
      setTimeout(()=>{
        this.notification={message:'',type:'info'}
      },1500)
    }
  }
  // searchFecha(date: Date) {
  //   let formattedDate: Date | undefined;
  //   if (date) {
  //     // Formatear la fecha a 'yyyy-MM-dd'
  //     const year = date.getFullYear();
  //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //     const day = date.getDate().toString().padStart(2, '0');
  //     // Crear un nuevo objeto Date con solo año, mes y día
  //     formattedDate = new Date(`${year}-${month}-${day}`);
  //   }
  //   // Pasar la fecha formateada a search
  //   this.search(undefined, formattedDate); 
  // }
  search_Nombre(input: HTMLInputElement) {
    const searchTem = input.value.trim()
    this.search(searchTem)
  }
  // dataSource=new MatTableDataSource<Reserva_Instalacion>();
  //minimaFecha:Date = new Date(1940,0,1);
  maximaFecha:Date = new Date();
  isEdit:boolean=false;
  currentId!:number;
  form!:FormGroup;
  horaInicioSeleccionada: string = '';
  diaSeleccionado: string = '';
  horario(event:any) {
    const instalacionSeleccionada = event.value; // Obtiene el objeto completo seleccionado
        this.horaInicioSeleccionada = `${instalacionSeleccionada?.horaInicio} - ${instalacionSeleccionada?.horaFin}`;
        this.diaSeleccionado = instalacionSeleccionada?.dia;
  }
  notification: { message: string; type: 'info' | 'success' | 'error' | 'warning'  } = {
    message: '',
    type: 'info'
  };
  items=[
    {value:'Reservada',label:'Reservada'},
    {value:'Finalizada',label:'Finalizada'},
  ]
  columns: string[] = [];
  title = 'Instalaciones';
  constructor(private fb:FormBuilder,
    private reservaService:ReservationService,
    private userSer:UserService,
    private instSer:InstallationService,
    private datepipe:DatePipe,
    private dialog:MatDialog
  ){}
  ngOnInit(): void {
    this.form=this.fb.group({
          usuario:["",[Validators.required,]],
          instalacion:["",[Validators.required,]],
          dia:[""],
          horario:[""],
          fecha:["",[Validators.required,]],
          estado:["",[Validators.required,]],
          Nombre_Apellido:[""],
          fecha_Select:[null]
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
  formatDate(date: string): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  }
  clearForm():void{
    this.form.reset({
        usuario:'',
        instalacion:'',
        dia:'',
        horario:'',
        fecha:'',
        estado:'',
    });
    this.currentId=0;
    this.isEdit=false;
}
  onSubmit() {
    if(this.form.invalid){
      console.log("formulario invalido")
      return;
    }
    const newReserva:Reserva_Instalacion = {
      usuario_ID: this.form.value.usuario?.id || 0,
      instalacion_ID: this.form.value.instalacion?.id || 0,
      fecha: this.formatDate(this.form.value.fecha),
      disponibilidad: this.form.value.estado || 'Reservada'
    };
    if(this.isEdit){
      newReserva.id=this.currentId
      console.log(newReserva)
      this.reservaService.updateReserva_Inst(newReserva).subscribe({
        next:(update)=>{
          this.notification={message:'La reserva se ha actualizado',type:'success'}
          this.getReserIn()
          this.clearForm()
        },
        error:(error)=>{
          this.notification={message:'La reserva no se ha podido actualizar',type:'error'}
        }
      })
    }
    else{
      delete newReserva.usuario
      delete newReserva.instalacion
      // console.log(newReserva)
        this.reservaService.addReserva_Inst(newReserva).subscribe({
          next: (add) => {
            console.log(newReserva)
            // this.notification={message:'La reserva se ha guardado',type:'success'}
            this.getReserIn()
            this.clearForm()
            this.reservaService.desactiveInstalacion(newReserva.instalacion_ID).subscribe(()=>{
              this.notification={message:'La reserva se ha guardado',type:'success'}
              this.getInstalacion()
            })
          },
          error: (error) => {
            this.notification={message:'La reserva no se ha guardado',type:'error'}
          }
        })
    }
    setTimeout(()=>{
      this.notification={message:'',type:'info'}
    },1500)
  } 
  
  onAction(accion: Accion) {
    if(accion.accion == 'Editar'){
      this.editar(accion.fila);
    }
    else if(accion.accion == 'Eliminar'){
      this.eliminar(accion.fila);
     console.log(accion.fila)
    }
  }
  selectedTab:number=0;
  usuarios!:Usuario[];
  reservaDetalle!: Reserva_Instalacion[];
  instalaciones!:Instalacion[];
  installList: Reserva_Instalacion[] = [];
  getReserIn(){
    // this.instalser.getReserva_Ins().subscribe(data=>{
    //   this.dataSource.data=data;
    // })
    this.columns=getEntityProperties('reserva_Install')
    this.reservaService.getReservaEntitys().subscribe(data=>{
      this.installList=data;
    })
  }
  
  editar(objeto: Reserva_Instalacion) {
    let id = objeto.id;
    console.log(id)
    this.reservaService.getReserva_ID_Inst(id).subscribe((reserva: Reserva_Instalacion) => {
      const reservaSeleccionada = reserva;
      this.obtenerReservas(reservaSeleccionada)
    })
  }
  obtenerReservas(reserva:Reserva_Instalacion){
    this.isEdit=true
    this.selectedTab=0
    if(reserva&&reserva.id){
      this.currentId=reserva.id
      console.log(reserva)
    }
    let usuarioSeleccinado = this.usuarios.find((u)=>u.id==reserva.usuario_ID)
    let instalacionSelec = this.instalaciones.find((i)=>i.id==reserva.instalacion_ID)
    this.form.setValue({
      usuario:usuarioSeleccinado,
      instalacion:instalacionSelec,
      dia:reserva.instalacion?.dia,
      horario:reserva.instalacion?.horaInicio+' - '+reserva.instalacion?.horaFin,
      fecha:reserva.fecha,
      estado:reserva.disponibilidad
    })
  }
  eliminar(objeto: Reserva_Instalacion) {
    console.log("eliminar",objeto.id);
    const dialogRef=this.dialog.open(DialogComponent,{
      data:{
        titulo:'Eliminar Registro',
        message:'¿Está seguro de que desea eliminar esta reserva?'
      }
    })
    let id = objeto.id
    console.log(id)
    dialogRef.afterClosed().subscribe(
      result=>{
        if(result){
          this.reservaService.deleteReserva_Inst(id).subscribe(()=>{
            this.notification={message:'La reserva se ha eliminada',type:'warning'}
            setTimeout(()=>{
              this.notification={message:'',type:'info'}
            },1000)
            this.getReserIn()
          })
        }
      }
    )
  }
}
