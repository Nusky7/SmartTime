import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private proyectosService: ProyectosService) { }

  ngOnInit(): void {
  }

  proyectoSeleccionadoId: number | null = null;

  proyectoSeleccionado(proyectoId: number) {
    this.proyectoSeleccionadoId = proyectoId;
  }
  
}

