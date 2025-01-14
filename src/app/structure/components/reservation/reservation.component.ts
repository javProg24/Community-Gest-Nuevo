import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-reservation',
  imports: [MatCardModule,MatIconModule,
    MatButtonModule,RouterLink,RouterLinkActive,NgFor],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent{
  items=[
    {icon:'location_on',title:'Instalaciones',router:'/Reserva_Instal'},
    {icon:'construction',title:'Herramientas',router:'/Reserva_Herr'}
  ];
}
