import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Crear Nuevo Proyecto', cols: 2, rows: 1, component: 'nproject' },
          { title: 'Card 2', cols: 1, rows: 1, component: 'formulario-notas' },
          {  cols: 1, rows: 2, component: 'home-calendar' },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Crear Nuevo Proyecto', cols: 2, rows: 1, component: 'nproject' },
        { title: 'Card 2', cols: 1, rows: 1, component: 'formulario-notas' },
        {  cols: 1, rows: 2, component: 'home-calendar' },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
