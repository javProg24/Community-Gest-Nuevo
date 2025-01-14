import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive,NgFor,NgIf,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuNav=[
      {title:'Inicio',routerLink:'/Home'},
      {title:'Acerca de',routerLink:'/About-Us'},
      {title:'Sobre Nosotros',routerLink:'/Member'},
      {title:'FAQs',routerLink:'/FAQs',icon:'help'},
      // {title:'Iniciar Sesion',routerLink:'/Login',icon:'person'},
    ]
    constructor(private router: Router){
    }
    isHomeActive():boolean{
      return this.router.url === '/Home'
    }
}
