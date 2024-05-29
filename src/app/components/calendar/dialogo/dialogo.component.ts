import { Component, Inject, OnInit, Optional, Self, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.scss']
})
export class DialogoComponent implements OnInit {

  @Output() agregarEvento = new EventEmitter<any>();
  @Output() modificarEvento = new EventEmitter<any>();

  firstFormGroup = this.formBuilder.group({
    titulo: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    descripcion: ['', Validators.required]
  });
  thirdFormGroup = this.formBuilder.group({
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required],
  });
  fourthFormGroup = this.formBuilder.group({
    horaInicio: ['', Validators.required],
    horaFin: ['', Validators.required]
  });

  eventoForm = this.formBuilder.group({
    formArray: this.formBuilder.array([
      this.firstFormGroup,
      this.secondFormGroup,
      this.thirdFormGroup,
      this.fourthFormGroup
    ])
  });
  isLinear = false;
  eventos: any = [];

  constructor(
    public dialogRef: MatDialogRef<DialogoComponent>, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,@Optional() @Self() public stepper: MatStepper,
    private eventService: EventService, private userService: UserService
  ) {
    if (data.evento) {
      this.firstFormGroup.patchValue({ titulo: data.evento.titulo });
      this.secondFormGroup.patchValue({ descripcion: data.evento.descripcion });
      this.thirdFormGroup.patchValue({
        fechaInicio: data.evento.fechaInicio.split('T')[0],
        fechaFin: data.evento.fechaFin.split('T')[0]
      });
      this.fourthFormGroup.patchValue({
        horaInicio: data.evento.horaInicio,
        horaFin: data.evento.horaFin
      });
    }
  }

  ngOnInit(): void {}

  public setEventos() {
    const user_id = this.userService.getUser();
    const titulo = this.firstFormGroup.value.titulo;
    const descripcion = this.secondFormGroup.value.descripcion;
    const fechaInicio = new Date(this.thirdFormGroup.value.fechaInicio || '');
    const fechaFin = new Date(this.thirdFormGroup.value.fechaFin || '');
    const horaInicio = this.fourthFormGroup.value.horaInicio || '00:00' ;
    const horaFin = this.fourthFormGroup.value.horaFin || '00:00';

    const fechaInicioCompleta = new Date(fechaInicio);
    const fechaFinCompleta = new Date(fechaFin);

    const [horaInicioHoras, horaInicioMinutos] = horaInicio.split(':').map(Number);
    const [horaFinHoras, horaFinMinutos] = horaFin.split(':').map(Number);

    fechaInicioCompleta.setHours(horaInicioHoras, horaInicioMinutos);
    fechaFinCompleta.setHours(horaFinHoras, horaFinMinutos);

    const event = {
      user_id,
      titulo,
      descripcion,
      fechaInicio: fechaInicioCompleta.toISOString(),
      fechaFin: fechaFinCompleta.toISOString(),
      horaInicio,
      horaFin
    };

    this.eventService.crearEvento(event).subscribe((data) => {
      this.agregarEvento.emit(this.eventos);
      this.dialogRef.close(event);
      console.log(event);
    });
  }


  guardarCambios() {
    const user_id = this.userService.getUser();
    const id = this.data.evento.id;
    const titulo = this.firstFormGroup.value.titulo;
    const descripcion = this.secondFormGroup.value.descripcion;
    const fechaInicio = new Date(this.thirdFormGroup.value.fechaInicio || '');
    const fechaFin = new Date(this.thirdFormGroup.value.fechaFin || '');
    const horaInicio = this.fourthFormGroup.value.horaInicio || '';
    const horaFin = this.fourthFormGroup.value.horaFin || '';

    const fechaInicioCompleta = new Date(fechaInicio);
    const fechaFinCompleta = new Date(fechaFin);

    const [horaInicioHoras, horaInicioMinutos] = horaInicio.split(':').map(Number);
    const [horaFinHoras, horaFinMinutos] = horaFin.split(':').map(Number);

    fechaInicioCompleta.setHours(horaInicioHoras, horaInicioMinutos);
    fechaFinCompleta.setHours(horaFinHoras, horaFinMinutos);

    const event = {
      user_id,
      id,
      titulo,
      descripcion,
      fechaInicio: fechaInicioCompleta.toISOString(),
      fechaFin: fechaFinCompleta.toISOString(),
      horaInicio,
      horaFin
    };

    this.eventService.modificarEvento(event).subscribe(() => {
      console.log(event);
      this.modificarEvento.emit(this.eventos);
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
