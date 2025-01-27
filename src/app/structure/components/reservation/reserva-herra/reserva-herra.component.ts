import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule, provideNativeDateAdapter} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';
import { ReservationService } from '../../../../services/reservation-service/reservation.service';
import { UserService } from '../../../../services/user-service/user.service';
import { ToolService } from '../../../../services/tool-service/tool.service';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatButtonModule } from '@angular/material/button';
import { TableComponent } from '../../../shared/table/table.component';
import { MatTabsModule } from '@angular/material/tabs';
import { Accion, getEntityProperties } from '../../../../models/tabla-columna';
import { Reserva_Herr } from '../../../../models/reservation';
import { Usuario } from '../../../../models/user';
import { Herramienta } from '../../../../models/tool';
import { NotificationComponent } from "../../../shared/notification/notification.component";
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-reserva-herra',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule,
    MatDatepickerModule, MatInputModule,
    MatCheckboxModule, MatSelectModule, MatOptionModule,
    NgFor, MatNativeDateModule, MatFormField, MatTimepickerModule, MatButtonModule, TableComponent,
    MatTabsModule, NotificationComponent,NgFor,NgIf],
  templateUrl: './reserva-herra.component.html',
  styleUrl: './reserva-herra.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservaHerraComponent implements OnInit{
  search_Inst(input: HTMLInputElement) {
      const searchQuery = input.value.trim();
      if (searchQuery) {
        this.reserva.searchReserva_Her(
          { instalacion: searchQuery }
        ).subscribe(
          (datos: Reserva_Herr[]) => {
            this.HerrllList = datos; // Actualizar la lista con los datos recibidos
          }
        );
      }
      else{
        this.getReseHer()
      }
    }
    search_Apellido(input: HTMLInputElement) {
      const searchQuery = input.value.trim();
      if (searchQuery) {
        this.reserva.searchReserva_Her(
          { apellido: searchQuery }
        ).subscribe(
          (datos: Reserva_Herr[]) => {
            this.HerrllList = datos; // Actualizar la lista con los datos recibidos
          }
        );
      }
      else{
        this.getReseHer()
      }
    }
    search_Nombre(input: HTMLInputElement) {
      const searchQuery = input.value.trim();
      
      // Verificar si se ingresó algo
      if (searchQuery) {
        this.reserva.searchReserva_Her(
          { nombre: searchQuery }
        ).subscribe(
          (datos: Reserva_Herr[]) => {
            this.HerrllList = datos; // Actualizar la lista con los datos recibidos
          }
        );
      }
      else{
        this.getReseHer()
      }
    }
  dias=[
    {label:'Lunes',value:'Lunes'},
    {label:'Martes',value:'Martes'},
    {label:'Miercoles',value:'Miercoles'},
    {label:'Jueves',value:'Jueves'},
    {label:'Viernes',value:'Viernes'},
    {label:' Sabado',value:'Sabado'},
    {label:'Domingo',value:'Domingo'}
  ]
  selectedTab:number=0;
  usuarios!:Usuario[];
  title:string = 'Reservas'
  HerrllList:Reserva_Herr[]=[]
  columns: string[] = [];
  isEdit:boolean=false;
  currentId!:number;
  onAction(accion: Accion) {
    if(accion.accion == 'Editar'){
      this.editar(accion.fila);
    }
    else if(accion.accion == 'Eliminar'){
      this.eliminar(accion.fila);
     console.log(accion.fila)
    }
  }
  editar(objeto:Reserva_Herr){
    let id=objeto.id
    this.reserva.getReserva_ID_Her(id).subscribe((reserva:Reserva_Herr)=>{
      const reservaSeleccionada = reserva
      this.obtenerReservas(reservaSeleccionada)
    })
  }
  obtenerReservas(reserva:Reserva_Herr){
    this.isEdit=true
    this.selectedTab=0
    if(reserva&&reserva.id){
      this.currentId=reserva.id
    }
    let usuarioSeleccinado = this.usuarios.find((u)=>u.id==reserva.usuario_ID)
    let herramientaSeleccionada=this.herramientas.find((h)=>h.id==reserva.herramienta_ID)
    this.formGroup.setValue({
      usuario:usuarioSeleccinado,
      herramienta:herramientaSeleccionada,
      dia:reserva.dia,
      hora_Inicio:reserva.horaInicio,
      hora_Fin:reserva.horaFin
    })
  }
  close() {
    this.formGroup.reset({
      usuario:'',
      herramienta:'',
      dia:'',
      hora_Inicio:'',
      hora_Fin:'',
      fecha:'',
      estado:'',
  });
  this.currentId=0;
  this.isEdit=false;
  }
  getReseHer(){
    this.columns=getEntityProperties('reserva_Herra')
    this.reserva.getReserva_Her().subscribe((data)=>{
      this.HerrllList=data
    })
  }
  constructor(private userSer:UserService,
    private serviceHe:ToolService,
    private fb:FormBuilder,
    private reserva:ReservationService,
    private dialog:MatDialog
  ){}
  ngOnInit(): void {
    
    this.formGroup=this.fb.group({
      usuario:['',[Validators.required,]],
      herramienta:['',[Validators.required,]],
      fecha:['',[Validators.required,]],
      dia:['',[Validators.required,]],
      estado:['',[Validators.required,]],
      hora_Inicio:['',[Validators.required,]],
      hora_Fin:['',[Validators.required,]],
      Nombre_Apellido_Instalacion:[''],
    })
    this.getHerramientas()
    this.getUser()
    this.getReseHer()
    // this.formGroup.get('fecha')?.valueChanges.subscribe((fechaSeleccionada: Date) => {
    //   if (fechaSeleccionada) {
    //     const diaSemana = this.obtenerDiaSemana(fechaSeleccionada);
    //     this.formGroup.patchValue({ dia: diaSemana });
    //   }
    // });
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
  herramientas!:Herramienta[];
  getHerramientas(){
    this.serviceHe.getHerramientasDispo().subscribe((data:Herramienta[])=>{
          this.herramientas=data;
          
          // console.log(this.instalaciones);
    })
  }
  obtenerDiaSemana(fecha: Date): string {
    const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const diaIndex = new Date(fecha).getDay();
    const dia = diasSemana[diaIndex];
    return dia.charAt(0).toUpperCase() + dia.slice(1); 
  }
  items=[
    {value:'Reservada',label:'Reservada'},
    {value:'Finalizada',label:'Finalizada'},
  ]
  notification: { message: string; type: 'info' | 'success' | 'error' | 'warning'  } = {
    message: '',
    type: 'info'
  };
  clearForm():void{
    this.formGroup.reset({
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
formatToString(hour: any): string {
  // Si hour es un string, lo dividimos y lo convertimos a número
  if (typeof hour === 'string') {
    const [hours, minutes] = hour.split(':').map(item => Number(item)); // Convertir los valores a números
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  // Si hour no es una cadena, lo tratamos como un número o Date
  if (!hour) return '00:00';  // Si no hay valor, devuelve '00:00' por defecto
  
  // Si hour es un número, lo convertimos a un objeto Date
  const date = new Date(hour);

  // Asegurarnos de que hours y minutes sean números
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Asegurarse de que las horas y minutos estén en formato de dos dígitos
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}



  onSubmit() {
    console.log(this.formGroup.value)
    if(this.formGroup.invalid){
      console.log("formulario invalido")
      return
    }
    const newReserva: Reserva_Herr = {
      usuario_ID: this.formGroup.value.usuario?.id || 0,
      herramienta_ID: this.formGroup.value.herramienta?.id || 0,  // Asegúrate de que este valor sea el id de la herramienta
      dia: this.formGroup.value.dia,
      horaInicio: this.formatToString(this.formGroup.value.hora_Inicio),
      horaFin: this.formatToString(this.formGroup.value.hora_Fin),
      fecha: this.formatDate(this.formGroup.value.fecha),
      disponibilidad: this.formGroup.value.estado || 'Reservada'
    };
    
    console.log(this.formGroup.value.herramienta);
    if(this.isEdit){
      newReserva.id=this.currentId;
      this.reserva.updateReserva_Her(newReserva).subscribe({
        next:(update)=>{
          this.notification={message:'La reserva se ha actualizado',type:'success'}
          console.log(newReserva)
          this.getReseHer()
          this.clearForm()
        },
        error:(error)=>{
          this.notification={message:'La reserva no se ha podido actualizar',type:'error'}
        }
      })
    }
    else{
      console.log(this.formGroup.value)
      this.reserva.addReserva_Her(newReserva).subscribe({
        next: (add) => {
          console.log(newReserva)
          
          this.clearForm()
          
            this.notification={message:'La reserva se ha guardado',type:'success'}
            this.getReseHer()
        
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
  formGroup!:FormGroup;
  eliminar(objeto:Reserva_Herr){
    console.log("eliminar",objeto.id);
    const dialogRef=this.dialog.open(DialogComponent,{
      data:{
        titulo:'Eliminar Registro',
        message:'¿Está seguro de que desea eliminar esta reserva?'
      }
    })
    let id = objeto.id
    dialogRef.afterClosed().subscribe(
      result=>{
        if(result){
          this.reserva.deleteReserva_Inst(id).subscribe(()=>{
            this.notification={message:'La reserva se ha eliminada',type:'warning'}
            setTimeout(()=>{
              this.notification={message:'',type:'info'}
            },1000)
            this.getReseHer()
          })
        }
      }
    )
  }
}
