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
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { UserService } from '../../../../services/user-service/user.service';
import { InstallationService } from '../../../../services/installation-service/installation.service';
import { TableComponent } from "../../../shared/table/table.component";
import { Reserva_Instalacion } from '../../../../models/reservation';
import { Accion, getEntityProperties } from '../../../../models/tabla-columna';
import { ReservationService } from '../../../../services/reservation-service/reservation.service';
import { MatTableModule} from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { Usuario } from '../../../../models/user';
import { Instalacion } from '../../../../models/instalation';
import { NotificationComponent } from "../../../shared/notification/notification.component";
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-reserva-install',
  standalone:true,
  imports: [MatCardModule,
    ReactiveFormsModule, MatFormFieldModule,
    MatDatepickerModule,
    MatPaginatorModule, MatCheckboxModule,
    MatSelectModule, MatOptionModule,
    NgFor, MatNativeDateModule,
    MatFormField, MatTimepickerModule,
    MatButtonModule, MatTabsModule,
    MatTableModule, CommonModule,
    MatIconModule, MatButtonModule,
    MatTableModule, TableComponent,
    NotificationComponent, NgIf,
    MatDatepicker,MatError,MatInputModule],
  templateUrl: './reserva-install.component.html',
  styleUrl: './reserva-install.component.css',
  providers:[DatePipe]
})
export class ReservaInstallComponent implements OnInit{
  search_Inst(input: HTMLInputElement) {
    const searchQuery = input.value.trim();
    if (searchQuery) {
      this.reservaService.searchReserva_Ins(
        { instalacion: searchQuery }
      ).subscribe(
        (datos: Reserva_Instalacion[]) => {
          this.reservasList = datos; // Actualizar la lista con los datos recibidos
          console.log(datos)
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
      this.reservaService.searchReserva_Ins(
        { apellido: searchQuery }
      ).subscribe(
        (datos: Reserva_Instalacion[]) => {
          this.reservasList = datos; // Actualizar la lista con los datos recibidos
          console.log(datos)
        }
      );
    }
    else{
      this.getReserIn()
    }
  }
  search_Nombre(input: HTMLInputElement) {
    const searchQuery = input.value.trim();
    
    if (searchQuery) {
      this.reservaService.searchReserva_Ins(
        { nombre: searchQuery }
      ).subscribe(
        (datos: Reserva_Instalacion[]) => {
          this.reservasList = datos; 
          console.log(datos)
        }
      );
    }
    else{
      this.getReserIn()
    }
  }
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
  title = 'Reservas';
  constructor(private fb:FormBuilder,
    private reservaService:ReservationService,
    private userSer:UserService,
    private instSer:InstallationService,
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
          Nombre_Apellido_Instalacion:[""],
    })
    this.getReserIn()
    this.getUser()
    // this.getInstalacionDisponibles()
    if(this.isEdit==false){
      this.getInstalacionDisponibles()
    }
    else if(this.isEdit==true){
      this.getInstalaciones()
      console.log("hola",this.getInstalaciones())
    }
  }
  getDayName(date: string): string {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const d = new Date(date);
    return daysOfWeek[d.getDay()];
  }
  getUser(){
    this.userSer.getUsers().subscribe((data:Usuario[])=>{
      this.usuarios=data;
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
      // delete newReserva.usuario
      // delete newReserva.instalacion
      // console.log(newReserva)
      let id_insta = newReserva.instalacion_ID
        this.reservaService.addReserva_Inst(newReserva).subscribe({
          next: (add) => {
            console.log(newReserva)
            // this.notification={message:'La reserva se ha guardado',type:'success'}
            this.getReserIn()
            this.clearForm()
            this.notification={message:'La reserva se ha guardado',type:'success'}
            this.getInstalacionDisponibles()
            this.instSer.desactiveInstalacion(id_insta).subscribe(()=>{})
          },
          error: (error) => {
            this.notification={message:'La reserva no se ha guardado',type:'error'}
          }
        })
    }
    setTimeout(()=>{
      this.notification={message:'',type:'info'}
    },1000)
  } 
  
  onAction(accion: Accion) {
    if(accion.accion == 'Editar'){
      
      this.editar(accion.fila);
      console.log("todas las instalaciones",this.instalaciones)
    }
    else if(accion.accion == 'Eliminar'){
      this.eliminar(accion.fila);
      
    }
  }
  selectedTab:number=0;
  usuarios!:Usuario[];
  instalaciones_Dispo!:Instalacion[];
  instalaciones!:Instalacion[]
  reservasList: Reserva_Instalacion[] = [];
  getReserIn(){
    // this.instalser.getReserva_Ins().subscribe(data=>{
    //   this.dataSource.data=data;
    // })
    this.columns=getEntityProperties('reserva_Install')
    this.reservaService.getReserva_Inst().subscribe((data)=>{
      this.reservasList=data;
      console.log(data)
    })
  }
  getInstalacionDisponibles(){
    this.instSer.getInstalaciones_Disponibles().subscribe((data:Instalacion[])=>{
      this.instalaciones_Dispo=data;
      // console.log(this.instalaciones);
    })
  }
  getInstalaciones(){
    this.instSer.getInstalaciones().subscribe((datos:Instalacion[])=>{
      this.instalaciones=datos
    })
    console.log("todas las instalaciones",this.instalaciones)
  }
  editar(objeto: Reserva_Instalacion) {
    console.log("todas las instalaciones",this.getInstalaciones())
    let id = objeto.id;
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
      
    }
    let usuarioSeleccinado = this.usuarios.find((u)=>u.id==reserva.usuario_ID)
    console.log('Usuario encontrado:', usuarioSeleccinado);
    let instalacionSelec = this.instalaciones.find((i) => i.id == reserva.instalacion_ID);
    console.log('Instalacion encontrado:', instalacionSelec);
    this.form.patchValue({
      usuario:usuarioSeleccinado,
      instalacion:instalacionSelec || null,
      dia:reserva.instalacion?.dia,
      horario:reserva.instalacion?.horaInicio+' - '+reserva.instalacion?.horaFin,
      fecha:reserva.fecha,
      estado:reserva.disponibilidad
    })
  }
  activarInstalacion(reserva:Reserva_Instalacion){
    console.log(reserva)
    // let instalacionSeleccionada=this.instalaciones.find((i)=>i.id==reserva.instalacion_ID)
    
    let id=reserva.instalacion?.id
    if(id!==undefined){
      this.instSer.activeInstalacion(id).subscribe(()=>{
        this.getInstalacionDisponibles();
      })
    }
  }
  eliminar(objeto: Reserva_Instalacion) {
    // console.log("eliminar",objeto.id);
    // const dialogRef=this.dialog.open(DialogComponent,{
    //   data:{
    //     titulo:'Eliminar Registro',
    //     message:'¿Está seguro de que desea eliminar esta reserva?'
    //   }
    // })
    // let id = objeto.id
    // console.log(id)
    // dialogRef.afterClosed().subscribe(
    //   result=>{
    //     if(result){
    //       this.reservaService.deleteReserva_Inst(id).subscribe(()=>{
    //         this.notification={message:'La reserva se ha eliminada',type:'warning'}
    //         setTimeout(()=>{
    //           this.notification={message:'',type:'info'}
    //         },1000)
    //         this.getReserIn()
    //       })
    //     }
    //   }
    // )
    const dialogRef=this.dialog.open(DialogComponent,{
      data:{
        titulo:'Finalizar reserva',
        message:'¿Desea finalizar la reserva?'
      } 
    })
    let id=objeto.id
    dialogRef.afterClosed().subscribe(
      result=>{
        if(result){
          if(id!==undefined){
            this.reservaService.desactiveReserva_Insta(id).subscribe(()=>{
              this.notification={
                message:'La reserva ha finalizado',
                type:'success'
              }
              this.reservaService.getReserva_ID_Inst(id).subscribe((reserva: Reserva_Instalacion) => {
                const reservaSeleccionada = reserva;
                console.log(reservaSeleccionada)
                this.activarInstalacion(reservaSeleccionada)
                this.getReserIn();
              console.log(this.getReserIn())
              })
            })
            setTimeout(()=>{
              this.notification={message:'',type:'info'}
            },2500)
          }
        }
      }
    )
  }
}
