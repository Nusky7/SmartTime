import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, SimpleChanges, SimpleChange } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { UserService } from 'src/app/services/user.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Task } from '../content/content.component';
import { TareasService } from 'src/app/services/tareas.service';
import { MatDialog } from '@angular/material/dialog';
import { TareaDialogComponent } from '../tarea-dialog/tarea-dialog.component';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';

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

  @Output() tareaAgregada: EventEmitter<void> = new EventEmitter();
  @Output() proyectoSeleccionado:EventEmitter<number> = new EventEmitter();
  proyectoSeleccionadoId: number | null = null;
  proyectos: any[] = [];
  tareas: any[] = [];
  panelOpenState: boolean = false;
  openedPanel: MatExpansionPanel | null = null;
  isDrawerOpen = false;

  constructor(private proyectosService: ProyectosService, private userService: UserService, 
    private cdref: ChangeDetectorRef, private tareasService: TareasService, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const userId = this.userService.getUser();
    if (userId) {
      this.proyectosService.getUserProyectos(userId).subscribe((data: any[]) => {
        this.proyectos = data.map((proyecto: any) => ({
          ...proyecto,
        }));
      });
    }
  }


  clicked(){
    this.panelOpenState = !this.panelOpenState;
  }

  seleccionarProyecto(proyecto_id: number): void {
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
      // width: '23vw'
    });

  
    dialogRef.afterClosed().subscribe(result => {
        this.tareasService.emitirTareaAgregada();
    });
  }
  

  borrarProyecto(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.proyectosService.borrarProyecto(id).subscribe(
          () => {
            console.log("Proyecto eliminado");
            this.proyectos = this.proyectos.filter(proyecto => proyecto.id !== id);
          },
          (error) => {
            console.error('Error al eliminar el proyecto:', error);
          }
        );
      }
    });
  }
}