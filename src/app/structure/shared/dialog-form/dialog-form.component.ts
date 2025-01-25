import { NgComponentOutlet } from '@angular/common';
import { Component, Inject, Injector, OnInit, Type } from '@angular/core';
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
export class DialogFormComponent implements OnInit{
  customInjector!: Injector;
  constructor(
    public dialogRef:MatDialogRef<DialogFormComponent>,
    private injector: Injector,
    @Inject(MAT_DIALOG_DATA)public data:{component: any; formData?: any;}
  ){}
  ngOnInit(): void {
    this.customInjector = Injector.create({
      providers: [{ provide: 'formData', useValue: this.data.formData }],
      parent: this.injector,
    });
  }
  
  closeDialog(){
    this.dialogRef.close();
  }
}
