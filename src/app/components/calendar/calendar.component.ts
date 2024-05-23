import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { DialogoComponent } from './dialogo/dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DateTime } from 'luxon';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit  {
  
  selectedDate: Date = new Date();
  eventos: any = [];
  selectedEvents: any = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  fechaInicio: Date = new Date();
  horaInicio: Date = new Date();
  fechaFin: Date = new Date();
  horaFin: Date = new Date();


  constructor(private eventService: EventService, private userService: UserService, 
     private dialog: MatDialog, private formBuilder: FormBuilder) 
     {this.firstFormGroup = formBuilder.group({});
     this.secondFormGroup = formBuilder.group({});
    }

  ngOnInit(): void {
   this.getEventos();
   console.log(this.eventos);
   this.firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required]
  });
  this.secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required]
  });
}



  getEventos(): any {
    const user_id = this.userService.getUser();
    if (user_id !== null) {
    this.eventService.consultarEventoPorId(user_id).subscribe((data) => {
      this.fechaSelect(this.selectedDate);
      this.eventos = data;
      });
      
  }}

  abrirDialogo(): void {
    const dialogRef = this.dialog.open(DialogoComponent, {
      width: '25vw', height: '55vh',
      panelClass: 'dialogoCalendar',
      data: { fechaInicio: this.fechaInicio, fechaFin: this.fechaFin, horaInicio: this.horaInicio, horaFin: this.horaFin }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this.eventos = [...this.eventos, result];
        this.selectedEvents = [...this.selectedEvents, result];
        this.fechaSelect(this.selectedDate);
        // this.getEventos();
      }
      console.log('El dialogo fue cerrado');
    });
  }



  fechasSeleccionadas(fechas: Date[]): void {
    this.fechaInicio = fechas[0];
    this.fechaFin = fechas[1];
  }

  formatoFecha(fecha: string | null): string {
    if (!fecha) {
      return "";
    }
    const fechaDate = new Date(fecha);
    const dia = fechaDate.getDate().toString().padStart(2, '0');
    const mes = (fechaDate.getMonth() + 1).toString().padStart(2, '0');
    const anyo = fechaDate.getFullYear().toString().slice(-2);
    const hora = fechaDate.getHours().toString().padStart(2, '0');
    const minuto = fechaDate.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${anyo} - ${hora}:${minuto}h`;
  }
  
  
  fechaSelect(date: Date) {
    console.log('Seleccionaste la fecha:', date);
    this.selectedDate = date;
    this.selectedEvents = this.eventos.filter((event: any) => {
      const eventStart = new Date(event.fechaInicio).setHours(0, 0, 0, 0);
      return eventStart === date.setHours(0, 0, 0, 0);
    });
  
    if (this.selectedEvents.length > 0) {
      console.log('Evento seleccionado:', this.selectedEvents[0].titulo);
    }
  }
  


  modificarEvento(evento: any) {
    const dialogRef = this.dialog.open(DialogoComponent, {
      width: '25vw',
      height: '55vh',
      data: { evento: evento }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.modificarEvento(result).subscribe(() => {
          this.getEventos();
        });
      }
    });
  }

  borrarEvento(evento: { id: number }) {
    const eventId = evento.id;
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eventService.borrarEvento(eventId).subscribe(data => {
          this.eventos = this.eventos.filter((e: { id: number; }) => e.id !== eventId);
          this.selectedEvents = this.selectedEvents.filter((e: { id: number; }) => e.id !== eventId);
          this.eventos = [...this.eventos];
          this.selectedEvents = [...this.selectedEvents];

          console.log(this.eventos);
        });
      }
    });
  }

}
  


