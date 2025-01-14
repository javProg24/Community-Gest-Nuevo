import { Component, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./structure/components/header/header.component";
import { SidebarComponent } from "./structure/components/sidebar/sidebar.component";
import { FooterComponent } from "./structure/components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Community-Gest';

}
