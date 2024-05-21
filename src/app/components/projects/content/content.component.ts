import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ThemePalette } from '@angular/material/core';
import { UserService } from '../../../services/user.service';
import { TareasService } from 'src/app/services/tareas.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
// import { BehaviorSubject, Observable } from 'rxjs';

export interface Task {
  id: number;
  proyectoId: number;
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
    private tareasService: TareasService, private dialog: MatDialog
) { }

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
        const selectedTasksCount = this.tareas.filter(task => task.completado).length;
        this.tareasService.updateSelectedTareas(task.proyectoId, selectedTasksCount);
       
    },
      (error) => {
        console.error('Error al modificar la tarea:', error);
      }
    );
  }

  borrarTarea(task: Task) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.proyectosService.borrarTarea(task.id).subscribe(
          () => {
            console.log('Tarea eliminada:', task);
            this.tareas = this.tareas.filter((t) => t.id !== task.id);
          },
          (error) => {
            console.error('Error al eliminar la tarea:', error);
          }
        );
      }
    });
  }

}

