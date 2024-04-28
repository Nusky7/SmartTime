import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotesService } from 'src/app/services/notes.service';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-formulario-notas',
  templateUrl: './fomulario-notas.component.html',
  styleUrls: ['./fomulario-notas.component.scss']
})
export class FormularioNotasComponent implements OnInit {
  nota: any = { titulo: "", contenido: "", fechaCreacion: "" };
  mostrarForm: boolean = false;

  constructor(private notasService: NotesService) {}

  ngOnInit(): void {
  
  }

  public mostrarEntrada(): void {
    this.mostrarForm = true;
  }
  

  public enviar() {
    const user_id = 1;
    this.nota.user_id = user_id;

    this.notasService.agregarNota(this.nota).subscribe({
      next: (response: any) => {
        console.log('Nota guardada correctamente:', response);
        // No necesitas push la nueva nota a this.notas ya que esto se hace en el componente ListadoNotasComponent
        // this.notas.push(response);
        this.notasService.nuevaNotaSubject.next(response);
        this.nota = {};
        // this.mostrarForm = false;
      },
      error: (error: any) => {
        console.error('Error al guardar la nota:', error);
      }
    });
  }
}