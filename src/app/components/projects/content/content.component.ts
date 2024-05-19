import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ThemePalette } from '@angular/material/core';
import { UserService } from '../../../services/user.service';
import { ProyectoProgressService } from 'src/app/services/proyecto-progress.service';
// import { BehaviorSubject, Observable } from 'rxjs';

export interface Task {
  id: number;
  titulo: string;
  descripcion: number | null;
  completado: boolean;
  color: ThemePalette;
  estado: string | null;
  prioridad: number | null;
}

export interface Proyecto {
  _id: number;
  titulo: string;
  descripcion: string;
  fechaVencimiento: string;
  progress: number;
  tareas: Task[];
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() proyectoId: number | null = null;
  @Output() projectProgressChange = new EventEmitter<number>();
  tareas: Task[] = [];
  items: Task[] = [];
  proyectos: Proyecto[] = [];
  proyectoProgress: number = 0;

  constructor(private proyectosService: ProyectosService, private userService: UserService,
    private proyectoProgressService: ProyectoProgressService) { }

  ngOnInit(): void {
  }

  panelOpenState = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['proyectoId'] && this.proyectoId) {
      this.proyectosService.getUserTareas(this.proyectoId).subscribe((data: Task[]) => {
        this.tareas = data;
      
      });
    }
  }

  allComplete: boolean = false;


  taskCompleted(task: Task) {
    task.completado = !task.completado;
    const descripcion = task.descripcion !== null ? task.descripcion.toString() : '';
    const estado = task.estado !== null ? task.estado : '';

    this.proyectosService.editarTarea(task.id, task.titulo, descripcion, task.completado, estado, task.prioridad || 0).subscribe(
      (response) => {
        console.log('Tarea modificada:', response);
        // Calcular el progreso del proyecto
        // const proyecto = this.proyectos.find(p => p._id === this.proyectoId);
        // if (proyecto !== undefined) {
          // this.proyectoProgress = this.getProjectProgress(proyecto);
          // Actualizar el progreso del proyecto en el servicio ProyectoProgressService
          this.proyectoProgressService.setProjectProgress({ [String(this.proyectoId)]: this.proyectoProgress  });
      // }
    },
      (error) => {
        console.error('Error al modificar la tarea:', error);
      }
    );
  }

  // Agregar este método
  // getProjectProgress(proyecto: Proyecto): number {
  //   if (!proyecto || !proyecto.tareas || proyecto.tareas.length === 0) {
  //     return 0;
  //   }
  //   const completedTasks = proyecto.tareas.filter(t => t.completado).length;
  //   return (completedTasks / proyecto.tareas.length) * 100;
  // }
}

