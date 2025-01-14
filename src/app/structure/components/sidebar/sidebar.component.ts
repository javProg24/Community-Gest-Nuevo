import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { navbarData, SideNavToogle } from '../../../models/nav-data';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule,NgFor,RouterLink,RouterLinkActive,NgIf,NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output()onToggleSidenav:EventEmitter<SideNavToogle>=new EventEmitter()
  toggleCollapse() {
    this.collapsed=!this.collapsed;
    this.onToggleSidenav.emit({
      collapsed: this.collapsed,
      screenWidth:this.screenWith
    })
  }
  screenWith=window.innerWidth
  nav=navbarData
  collapsed=true
  closeSideNav() {
    this.collapsed=true
    this.onToggleSidenav.emit({
      collapsed: this.collapsed,
      screenWidth:this.screenWith
    })
  }
  // isMenuHidden = false;

  // toggleMenu() {
  //   this.isMenuHidden = !this.isMenuHidden;
  // }
}
