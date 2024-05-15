import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {

  @Output() proyectoSeleccionado: EventEmitter<number> = new EventEmitter();

  proyectos: any[] = [];
  panelOpenState: boolean = false;
  proyectoSeleccionadoId: number | null = null;


  constructor(private proyectosService: ProyectosService, private userService: UserService
  ) { }

  ngOnInit(): void {
    const userId = this.userService.getUser();
    if (userId) {
    this.proyectosService.getUserProyectos(userId).subscribe((data:any[]) => {
      this.proyectos = data;
      console.log(this.proyectos);
    });
  }
}

  formatoFecha(fecha: string | null): string {
    if (!fecha) {
      return "";
    }
    const fechaDate = new Date(fecha);
    const dia = fechaDate.getDate().toString().padStart(2, '0');
    const mes = (fechaDate.getMonth() + 1).toString().padStart(2, '0');
    const anyo = fechaDate.getFullYear().toString();
    return `${dia}/${mes}/${anyo}`;
  }
  
}
