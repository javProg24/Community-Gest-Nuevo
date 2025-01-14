import { NgComponentOutlet } from '@angular/common';
import { Component, Inject, OnInit, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup } from '@angular/forms';
import { ComponentType } from '@angular/cdk/portal';

export interface I_FormComponent {
  formGroup: FormGroup;
  onSubmit(): void;
}
@Component({
  selector: 'app-dialog-form',
  standalone: true,
  imports: [
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NgComponentOutlet
  ],
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css'] // Corregido: styleUrls en lugar de styleUrl
})
export class DialogFormComponent {
  constructor(public dialogRef:MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA)public data:{component:ComponentType<any> }
  ){}
  
  closeDialog(){
    this.dialogRef.close();
  }
  // public dialogRef!: MatDialogRef<DialogFormComponent>;
  // constructor(
  //   @Inject(MAT_DIALOG_DATA) public data: { component: Type<I_FormComponent> },
  // ) {}
}
