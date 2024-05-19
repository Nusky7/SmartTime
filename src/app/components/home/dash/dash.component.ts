import { Component, ViewEncapsulation  } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UserService } from 'src/app/services/user.service';
import { style } from '@angular/animations';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashComponent {
  nombre: string | null = null;
  cards;
  isHandset: boolean = false; 

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService) {
    this.nombre = this.userService.getNombre();
    // Observable para actualizar las cards y el isHandset según el tamaño de la pantalla 
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
      this.isHandset = result.matches;
      this.cards = this.getCards();
    });
    this.cards = this.getCards();
  }

  // Según el tamaño de la pantalla muestra una vista para móvil o para pc:
  getCards() {
    if (this.isHandset) {
      return [
        { title: 'Crear Nuevo Proyecto', cols: 2, rows: 1, component: 'nproject' },
        { title: 'Editar Evento', cols: 2, rows: 1, component: 'editar-evento' },
        { cols: 2, rows: 1, component: 'home-calendar'},
        { title: 'Listado de Notas', cols: 2, rows: 1, component: 'listado-notas' }
      ];
    } else {
      return [
        { title: 'Crear Nuevo Proyecto', cols: 2, rows: 1, component: 'nproject' },
        { title: 'Editar Evento', cols: 1, rows: 1, component: 'editar-evento' },
        { title: 'calendario', cols: 1, rows: 2, component: 'home-calendar' },
        { title: 'Listado de Notas', cols: 1, rows: 1, component: 'listado-notas' }
      ];
    }
  }
}
