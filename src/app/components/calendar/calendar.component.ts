import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent implements OnInit  {
  
  selectedDate: Date = new Date();
  eventos: any = [];
  selectedEvents: any = [];

  constructor(private eventService: EventService, private userService: UserService) {}

  ngOnInit(): void {
   this.getEventos();
   console.log(this.eventos);
  }

  getEventos(): any {
    const user_id = this.userService.getUser();
    if (user_id !== null) {
    this.eventService.consultarEventoPorId(user_id).subscribe((data) => {
      this.eventos = data;
      });
      
  }}

  public formatoFecha(fecha: string | null): string {
    if (!fecha) {
      return "";
    }
    const fechaDate = new Date(fecha);
    const dia = fechaDate.getDate().toString().padStart(2, '0');
    const mes = (fechaDate.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaDate.getFullYear();
    const hora = fechaDate.getHours().toString().padStart(2, '0');
    const minuto = fechaDate.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${anio} - ${hora}:${minuto}h`;
  }
  
  public fechaSelect(date: Date) {
   console.log('Seleccionaste la fecha:', date);
  this.selectedEvents = this.eventos.filter((event: any) => {
    const eventStart = new Date(event.fechaInicio).setHours(0, 0, 0, 0);
    return eventStart === date.setHours(0, 0, 0, 0);
  });
  if (this.selectedEvents.length > 0) {
    console.log('Evento seleccionado:', this.selectedEvents[0].titulo);
  }
}
}
  


