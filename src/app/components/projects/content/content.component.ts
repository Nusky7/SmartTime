import { Component, OnInit, Input, SimpleChanges  } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import {ThemePalette} from '@angular/material/core';
import { UserService } from '../../../services/user.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() proyectoId: number | null = null;
  tareas: any[] = [];
  projectId: number | null = null;

  constructor(private proyectosService: ProyectosService, private userService: UserService) { }

  ngOnInit(): void {
  }

  panelOpenState = false;

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['proyectoId'] && this.proyectoId) {
      this.proyectosService.getUserTareas(this.proyectoId).subscribe((data: any[]) => {
        this.tareas = data;
      });
    }
  }

  task: Task = {
    name: 'Acabar vistas Proyectos',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Acabar vistas proyecto', completed: false, color: 'warn'},
      {name: 'Acabar lógica proyecto', completed: false, color: 'warn'},
      {name: 'Enlazar componentes al dash', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'primary'},
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }
}
