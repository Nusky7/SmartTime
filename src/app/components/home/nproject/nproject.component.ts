import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nproject',
  templateUrl: './nproject.component.html',
  styleUrls: ['./nproject.component.scss']
})
export class NprojectComponent implements OnInit {

  stepper= false;
  isLinear = false;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
  
  }
  abrirSteps(){
    this.stepper = !this.stepper ;
  }
  cerrar(){
    this.stepper = false;
  }

}
