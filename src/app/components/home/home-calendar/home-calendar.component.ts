import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home-calendar',
  templateUrl: './home-calendar.component.html',
  styleUrls: ['./home-calendar.component.scss']
})
export class HomeCalendarComponent implements OnInit {

  selectedDate: Date = new Date();
  eventos: any = [];
  selectedEvents: any = [];

  constructor(private userService: UserService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
  }

  public getEventos(): any {
    const user_id = this.userService.getUser();
    if (user_id !== null) {
    this.eventService.consultarEventoPorId(user_id).subscribe((data) => {
      this.fechaSelect(this.selectedDate);
      this.eventos = data;
      });
      
  }}

  public fechaSelect(date: Date) {
    console.log('Seleccionaste la fecha:', date);
    this.selectedDate = date;
   //  this.selectedDate = this.getEventos();
    this.selectedEvents = this.eventos.filter((event: any) => {
     const eventStart = new Date(event.fechaInicio).setHours(0, 0, 0, 0);
     return eventStart === date.setHours(0, 0, 0, 0);
     
   });

}
}