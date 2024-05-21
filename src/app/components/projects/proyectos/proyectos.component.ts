import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { UserService } from 'src/app/services/user.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Task } from '../content/content.component';
import { TareasService } from 'src/app/services/tareas.service';
import { MatDialog } from '@angular/material/dialog';
import { TareaDialogComponent } from '../tarea-dialog/tarea-dialog.component';

export interface Proyecto {
  id: number;
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
  tareas: any[] = [];
  panelOpenState: boolean = false;
  proyectoSeleccionadoId: number | null = null;
  openedPanel: MatExpansionPanel | null = null;
  proyectoSelect: any = null;
  isDrawerOpen = false;
  proyectoProgress: number = 0;
  totalTasks: number = 0;

  constructor(private proyectosService: ProyectosService, private userService: UserService, private cdref: ChangeDetectorRef,
    private tareasService: TareasService, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const userId = this.userService.getUser();
    this.actualizarTareas();
    if (userId) {
      this.proyectosService.getUserProyectos(userId).subscribe((data: any[]) => {
        this.proyectos = data.map((proyecto: any) => ({
          ...proyecto,
          progress: 0
        }));
      });
    }
  }

  actualizarTareas() {
    if (this.proyectoSeleccionadoId) {
      this.proyectosService.getUserTareas(this.proyectoSeleccionadoId).subscribe((data: Task[]) => {
        this.tareas = data;
        this.cdref.detectChanges();
      });
    }
  }

  clicked(){
    this.panelOpenState = !this.panelOpenState;
  }

  seleccionarProyecto(proyecto_id: number | null): void {
    if (proyecto_id !== null) {
      this.proyectoSeleccionadoId = proyecto_id;
      this.proyectoSeleccionado.emit(proyecto_id);
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
    return `${dia}/${mes}/${anyo}`
  }

  openTareaDialog(proyectoSeleccionadoId:any): void {
    const dialogRef = this.dialog.open(TareaDialogComponent, {
      data: { parent: this, proyecto_id: proyectoSeleccionadoId },

      width: '400px'
      
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save') {
        this.actualizarTareas();
      }
    });
  }

  borrarProyecto(id: number) {
    if (id) {
      this.proyectosService.borrarProyecto(id).subscribe(() => {
        this.proyectos = this.proyectos.filter(proyecto => proyecto.id !== id);
      });
      console.log("proyecto eliminado");
    } else {
      console.log("Error al eliminar el proyecto");
    }
  }
}
