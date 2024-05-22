import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor( private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  proyectoSeleccionadoId: number | null = null;  
  proyectosTareas: any[] = [];

    proyectoSeleccionado(proyectoId: number) {
      this.proyectoSeleccionadoId = proyectoId;
    }

  }



