import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [MatCardModule, NgFor, RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  menuItems=[
    {Title:'Instalaciones',icon:'/image/instalaciones.png',routerLink:'/Installation'},
    {Title:'Herramientas',icon:'/image/herramienta.png',routerLink:'/Tool'},
    {Title:'Reservaciones',icon:'/image/reserva.png',routerLink:'/Reservation'},
    {Title:'Historial',icon:'/image/historial.png',routerLink:'/History'},
    {Title:'Reportes',icon:'image/reporte.png',routerLink:'/Report'},
    {Title:'Usuarios',icon:'/image/usuario.png',routerLink:'/User'},
    // {Title:'Horario',icon:'/image/horario.png',routerLink:'/Time'}
  ]
  
}
