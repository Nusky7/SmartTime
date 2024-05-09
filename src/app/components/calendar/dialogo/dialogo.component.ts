import { Component, Inject, OnInit,  Optional, Self } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.scss']
})
export class DialogoComponent implements OnInit {


  firstFormGroup = this.formBuilder.group({
    titulo: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({      
    descripcion: ['', Validators.required]
  });
  thirdFormGroup = this.formBuilder.group({      
    fechaInicio: [this.data.fechaInicio, Validators.required],
    fechaFin: [this.data.fechaFin, Validators.required]
  });
  eventoForm = this.formBuilder.group({
    formArray: this.formBuilder.array([
      this.firstFormGroup,
      this.secondFormGroup,
      this.thirdFormGroup
    ])
  });
  isLinear = false;
  

  constructor(
    public dialogRef: MatDialogRef<DialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    @Optional() @Self() public stepper: MatStepper
  ) {
  }

  ngOnInit(): void {
    
  }

  nextStep(): void {
    this.stepper.next();
  }

  previousStep(): void {
    this.stepper.previous();
  }

  onCancelar(): void {
    this.dialogRef.close();
  }
}
