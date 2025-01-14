import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [NgFor,MatIconModule,RouterLink,RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  icons=[
    { icon: '/image/facebook.png' },
    { icon: '/image/x.png' },
    { icon: '/image/instagram.png' },
    { icon: '/image/github.png' },
  ]
  menu=[
    {title:'CommunityGest',routerLink:'/Home'},
    {title:'Sobre Nosotros',routerLink:'/Member'},
  ]
}
