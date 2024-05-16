import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ThemePalette } from '@angular/material/core';
import { UserService } from '../../../services/user.service';

export interface Task {
  id: number;
  titulo: string;
  descripcion: number | null;
  completado: boolean;
  color: ThemePalette;
  estado: string | null;
  prioridad: number | null;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() proyectoId: number | null = null;
  tareas: Task[] = [];
  // projectId: number;

  constructor(private proyectosService: ProyectosService, private userService: UserService) { }

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

  // updateAllComplete() {
  //   this.allComplete = this.tareas != null && this.tareas.every(t => t.completado);
  // }

  taskCompleted(task: Task) {
  task.completado = !task.completado;
  const descripcion = task.descripcion !== null ? task.descripcion.toString() : '';
  const estado = task.estado !== null ? task.estado : '';
  const completado = task.completado ? true : false;
  
  this.proyectosService.editarTarea(task.id, task.titulo, descripcion, completado, estado, task.prioridad || 0 ).subscribe(
    (response) => {
      console.log('Tarea modificada:', response);

    },
    (error) => {
      console.error('Error al modificar la tarea:', error);
    }
  );
}

  // someComplete(): boolean {
  //   if (this.tareas == null) {
  //     return false;
  //   }
  //   return this.tareas.filter(t => t.completado).length > 0 && !this.allComplete;
  // }

  // setAll(completed: boolean) {
  //   this.allComplete = completed;
  //   if (this.tareas == null) {
  //     return;
  //   }
  //   this.tareas.forEach(t => (t.completado = completed));
  // }




}
