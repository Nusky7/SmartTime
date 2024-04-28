import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-listado-notas',
  templateUrl: './listado-notas.component.html',
  styleUrls: ['./listado-notas.component.scss']
})
export class ListadoNotasComponent implements OnInit {
  @Input() notas: any[] = [];
  @ViewChild('notasList') notasList!: MatSelectionList;

  constructor(private notasService: NotesService) { }

  ngOnInit(): void {
    this.mostrar();
  }

  public mostrar(): void {
    const user_id = 1;
  
    this.notasService.consultarNotaPorId(user_id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.notas = response.map((nota: any) => ({ ...nota, id: nota.id }));
        console.log(this.notas);
      },
      error: (error: any) => {
        console.error("Error al consultar las notas", error);
      }
    });
  }

  public borrarSeleccion(): void {
    const notasSeleccionadas = this.notasList.selectedOptions.selected;
    if (notasSeleccionadas.length === 0) {
      console.error("No se ha seleccionado ninguna nota");
      return;
    }
    notasSeleccionadas.forEach((nota: any) => {
      const notaSeleccionada = nota.value as any;
      if (notaSeleccionada.id) {
        const url = `http://localhost/API/index.php/notas/${notaSeleccionada.id}`;
        console.log(url); // Aquí se imprime la URL de la solicitud en la consola
        this.notasService.eliminarNotas(notaSeleccionada.id).subscribe({
          next: (response: any) => {
            console.log(response);
            this.mostrar();
          },
          error: (error: any) => {
            console.error("Error al eliminar la nota", error);
          }
        });
      } else {
        console.error("La nota seleccionada no tiene un ID válido", notaSeleccionada);
      }
    });
  }
}
