import { Component, OnInit, Input, Output,  SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ThemePalette } from '@angular/material/core';
import { UserService } from '../../../services/user.service';
import { TareasService } from 'src/app/services/tareas.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
// import { EventEmitter } from 'stream';


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

  @Input() proyectosTareas: any[] = [];
  @Input() proyectoId: number | null = null;

  tareas: Task[] = [];
  proyectos: Proyecto[] = [];
  panelOpenState: boolean = false;

  constructor(private proyectosService: ProyectosService, private userService: UserService,
    private tareasService: TareasService, private dialog: MatDialog, private cdref: ChangeDetectorRef,
  ) {}

   ngOnInit(): void {
    const userId = this.userService.getUser();
    if (userId) {
      this.proyectosService.getUserProyectos(userId).subscribe((data: any[]) => {
        this.proyectos = data.map((proyecto: any) => ({
          ...proyecto,
        }));
      }); 
    }
    this.tareasService.tareaAgregada$.subscribe(() => {
      this.actualizarTareas();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['proyectoId'] && this.proyectoId) {
      this.proyectosService.getUserTareas(this.proyectoId).subscribe((data: Task[]) => {
        this.tareas = data;
        this.cdref.detectChanges();
      });
    }
  }


  actualizarTareas(): void {
    if (this.proyectoId) {
      this.proyectosService.getUserTareas(this.proyectoId).subscribe((data: Task[]) => {
        this.tareas = data;
        this.cdref.detectChanges();
      });
    }
  }
  
  
  tareaCompleta(task: Task) {
    task.completado = !task.completado;
    const descripcion = task.descripcion !== null ? task.descripcion.toString() : '';
    const estado = task.estado !== null ? task.estado : '';
    if (task.completado){ 
      task.prioridad = 0;
    } else {
      task.prioridad = 1;
    }
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


  cambiarPrioridad(task: Task, event: Event) {
    const newPrioridad = (event.target as HTMLSelectElement)?.value;
    if (newPrioridad !== null) {
      task.prioridad = parseInt(newPrioridad, 10);
      const descripcion = task.descripcion !== null ? task.descripcion.toString() : '';
      const estado = task.estado !== null ? task.estado : '';
  
      this.proyectosService.editarTarea(task.id, task.titulo, descripcion, task.completado, estado, task.prioridad || 0).subscribe(
        (response) => {
          console.log('Tarea modificada:', response);
        },
        (error) => {
          console.error('Error al modificar la tarea:', error);
        }
      );
    }
  }


  borrarTarea(task: Task) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.proyectosService.borrarTarea(task.id).subscribe(() => {
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

