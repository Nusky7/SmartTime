import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { ThemeComponent } from '../theme/theme.component';

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
