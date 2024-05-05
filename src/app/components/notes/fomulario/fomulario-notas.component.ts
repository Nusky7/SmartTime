import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotesService } from 'src/app/services/notes.service';
import { UserService } from 'src/app/services/user.service';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-formulario-notas',
  templateUrl: './fomulario-notas.component.html',
  styleUrls: ['./fomulario-notas.component.scss']
})
export class FormularioNotasComponent implements OnInit {
  nota: any = { titulo: "", contenido: "", fechaCreacion: "" };
  mostrarForm: boolean = false;

  constructor(private notasService: NotesService, private userService: UserService) {}

  ngOnInit(): void {
  }

  public enviar() {
    
    const user_id = this.userService.getUser();
    this.nota.user_id = user_id;

    this.notasService.agregarNota(this.nota).subscribe({
      next: (response: any) => {
        console.log('Nota guardada correctamente:', response);
        console.log(this.nota.user_id);
        this.notasService.nuevaNotaSubject.next(response);
        this.nota = {};
      },
      error: (error: any) => {
        console.error('Error al guardar la nota:', error);
      }
    });
  }
}