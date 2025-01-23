import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Miembros } from '../../../models/member';
import { MerbersService } from '../../../services/member-service/merbers.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-member',
  standalone:true,
  imports: [NgIf,MatCardModule,UpperCasePipe,MatIconModule,MatButtonModule,NgFor],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent implements OnInit{
  viewProfile(profile: Miembros) {
    const dialogRef =  this.win_dialog.open(DialogComponent,{
      width: '250px',
      height:'',
      data:{
        name:profile.name,
        lastName:profile.lastName,
        link:profile.link,
        phone:profile.phone,
        role:profile.role
      }
    })
  }
  ngOnInit(): void {
    this.getProfiles();
  }
  title='Colaboradores encargados de desarrollar el Sistema Web'
  profiles: Miembros []=[];
  constructor(private services:MerbersService,private win_dialog:MatDialog) { }
  getProfiles(){
    this.services.getMembers().subscribe((data:Miembros[]) => {
      this.profiles=data
      console.log(data)
    })
  }
}
