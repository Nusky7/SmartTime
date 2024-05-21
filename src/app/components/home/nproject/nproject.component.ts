import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { UserService } from 'src/app/services/user.service';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { StepperOrientation } from '@angular/cdk/stepper'; // 

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
  thirdFormGroup = this._formBuilder.group({
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required],
  });
  
  stepperOrientation: StepperOrientation;


  constructor(private _formBuilder: FormBuilder, private proyectosService: ProyectosService, private userService: UserService) {
    this.stepperOrientation = window.innerWidth <= 800 ? 'vertical' : 'horizontal'; 

    fromEvent(window, 'resize')
    .pipe(
      // Espera 200ms antes de emitir el evento 
      debounceTime(200),
      // Convierte el evento en el ancho de la ventana
      map(() => window.innerWidth)
    )
    .subscribe((width) => {
      this.stepperOrientation = width <= 800 ? 'vertical' : 'horizontal';
    });
  }

  ngOnInit() {

  }

  submit() {
    const userId = this.userService.getUser();
    const titulo = this.firstFormGroup.value.firstCtrl ?? '';
    const descripcion = this.secondFormGroup.value.secondCtrl ?? '';
    const fechaFin = this.thirdFormGroup.value.fechaFin ?? '';
    const fechaInicio = this.thirdFormGroup.value.fechaInicio ?? '';
    this.proyectosService.crearProyecto(titulo, descripcion, userId || 0, fechaFin, fechaInicio).subscribe(
      response => {
        console.log('Proyecto creado:', response);
      },
      error => {
        console.error('Error al crear proyecto:', error);
      }
    );
  }


  abrirSteps(){
    this.stepper = !this.stepper ;
  }
  cerrar(){
    this.stepper = false;
  }

}
