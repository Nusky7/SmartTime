import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent  {
  // selectedDate: Date;

  constructor() {
    this.selectedDate = new Date();
  }

  selectedDate: Date = new Date();

  onDateSelected(date: Date) {

    
    console.log('Seleccionaste la fecha:', date);
  }
}
