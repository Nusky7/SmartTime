import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {

  // Array que contiene todas las notas provenientes del formulario 
  // (La creación de notas se maneja en el componete formulario-notas)
  notas: any[] = [];
  // Booleano para mostrar el formulario (Sin utilizar de momento)
  mostrarForm: boolean = false;

  constructor() {}

  isMobile(): boolean {
    return window.innerWidth <= 800; 
  }

  ngOnInit(): void {

    }
  }
