import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { UserService } from 'src/app/services/user.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ProyectoProgressService } from 'src/app/services/proyecto-progress.service';
import { Task } from '../content/content.component';

export interface Proyecto {
  _id: number;
  titulo: string;
  descripcion: string;
  fechaVencimiento: string;
  progress: number;
  tareas: Task[];
}

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
  openedPanel: MatExpansionPanel | null = null;
  proyectoSelect: any = null;
  isDrawerOpen = false;
  proyectoId: number | null = null;
  proyectoProgress: any = {};

  constructor(private proyectosService: ProyectosService, private userService: UserService,
    private proyectoProgressService: ProyectoProgressService, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    const userId = this.userService.getUser();
    if (userId) {
      this.proyectosService.getUserProyectos(userId).subscribe((data: any[]) => {
        this.proyectos = data.map((proyecto: any) => ({
          ...proyecto,
          progress: 0
        }));
        console.log(this.proyectos);});
      //   // Calcular el progreso de cada proyecto
      //   this.proyectos.forEach(proyecto => {
      //     const progress = this.getProjectProgress(proyecto);
      //     this.proyectoProgressService.setProjectProgress({[proyecto._id]: progress});
      //   });
      //   this.cdref.detectChanges();
      // });
    // }
    // this.proyectoProgressService.getProyectoSeleccionado().subscribe((proyecto: any) => {
    //   if (proyecto) {
    //     this.proyectoSeleccionadoId = proyecto._id;
    //     this.proyectoSelect = proyecto;
    //   }
    // });
    // this.proyectoProgressService.projectProgress$.subscribe((newProgress: any) => {
    //   this.proyectoProgress = newProgress;
    //   this.cdref.detectChanges();
    // });
  }}

  // getProjectProgress(proyecto: Proyecto): number {
  //   if (!proyecto || !proyecto.tareas || proyecto.tareas.length === 0) {
  //     return 0;
  //   }
  //   const completedTasks = proyecto.tareas.filter(t => t.completado).length;
  //   const progress = (completedTasks / proyecto.tareas.length) * 100;
  //   return progress;
  // }

  clicked(){
    this.panelOpenState = !this.panelOpenState;
  }

  formatoFecha(fecha: string | null): string {
    if (!fecha) {
      return "";
    }
    const fechaDate = new Date(fecha);
    const dia = fechaDate.getDate().toString().padStart(2, '0');
    const mes = (fechaDate.getMonth() + 1).toString().padStart(2, '0');
    const anyo = fechaDate.getFullYear().toString();
    return `${dia}/${mes}/${anyo}`
  }
}
