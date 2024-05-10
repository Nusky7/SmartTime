import { Component, Inject, OnInit,  Optional, Self, Output, Input, EventEmitter, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { CalendarComponent } from '../calendar.component';
import * as moment from 'moment'; 
import { isoToUTCString } from '@okta/okta-auth-js';


@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.scss']
})
export class DialogoComponent implements OnInit {

  @Output() agregarEvento = new EventEmitter<any>();


  firstFormGroup = this.formBuilder.group({
    titulo: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({      
    descripcion: ['', Validators.required]
  });
  thirdFormGroup = this.formBuilder.group({      
    // horaInicio: this.formBuilder.group({
    //   date: ['', Validators.required],
    //   hour: ['', Validators.required]
    // }),
    fechaFin: ['', Validators.required],
    fechaInicio: ['newDate()', Validators.required],
  
  });
  eventoForm = this.formBuilder.group({
    formArray: this.formBuilder.array([
      this.firstFormGroup,
      this.secondFormGroup,
      this.thirdFormGroup
    ])
  });
  isLinear = false;
  eventos: any = [];



  constructor( public dialogRef: MatDialogRef<DialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    @Optional() @Self() public stepper: MatStepper, private eventService: EventService,
    private userService: UserService,  ) {
      if (data.evento) {
        this.firstFormGroup.patchValue({
          titulo: data.evento.titulo
        });
        this.secondFormGroup.patchValue({
          descripcion: data.evento.descripcion
        });
        this.thirdFormGroup.patchValue({
          fechaInicio: data.evento.fechaInicio,
          fechaFin: data.evento.fechaFin
        });
      }
    }

  ngOnInit(): void {
  }


public setEventos(){
  const user_id = this.userService.getUser();
  const titulo = this.firstFormGroup.value.titulo;
  const descripcion = this.secondFormGroup.value.descripcion;
  const fechaInicio = this.thirdFormGroup.value.fechaInicio;
  const fechaFin = this.thirdFormGroup.value.fechaFin;
  const event = { user_id, titulo, descripcion, fechaInicio, fechaFin }; 

    this.eventService.crearEvento(event).subscribe((data) => {    
    this.agregarEvento.emit(this.eventos); 
    this.dialogRef.close(event); 
      });
    }

    guardarCambios() {

      // const event = {
      //   id: this.data.evento.id,
      //   user_id: this.userService.getUser(),
      //   titulo: this.firstFormGroup.value.titulo,
      //   descripcion: this.secondFormGroup.value.descripcion,
      //   fechaInicio: fechaInicio,
      //   fechaFin: fechaFin
      // };

      // const eventStart = new Date(event.fechaInicio).setHours(0, 0, 0, 0);
      // return eventStart === date.setHours(0, 0, 0, 0);

      const user_id = this.userService.getUser();
      const id = this.data.evento.id;
      const titulo = this.firstFormGroup.value.titulo;
      const descripcion = this.secondFormGroup.value.descripcion;
      const fechaInicio = new Date(this.thirdFormGroup.value.fechaInicio || '' );
      const fechaFin = this.thirdFormGroup.value.fechaFin;
      const event = { user_id, id, titulo, descripcion, fechaInicio, fechaFin }; 
      

      this.eventService.modificarEvento(event).subscribe(() => {
        console.log(event);
        this.dialogRef.close(event);
      });
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
