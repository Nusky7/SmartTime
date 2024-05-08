import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { UserService } from 'src/app/services/user.service';
import { MatSelectionList } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { DetallesNotaComponent } from '../detalles/detalles-nota.component';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-listado-notas',
  templateUrl: './listado-notas.component.html',
  styleUrls: ['./listado-notas.component.scss']
})
export class ListadoNotasComponent implements OnInit {
  @Input() notas: any[] = [];
  @ViewChild('notasList') notasList!: MatSelectionList;

  cambiosNoGuardados: boolean = false;
  nota = false;

  constructor(private notasService: NotesService, 
    private userService: UserService,
    public dialog: MatDialog) { }
    

  ngOnInit(): void {
    this.mostrar();
    this.notasService.notaAgredada$.subscribe(() =>{
      this.mostrar();
    });
  }

  public abrirNota(nota: any): void {
    const dialogRef = this.dialog.open(DetallesNotaComponent, {
      width: '300px',
      data: { nota: nota },
    });
    dialogRef.componentInstance.cambiosNoGuardados.subscribe((cambios: boolean) => {
      this.cambiosNoGuardados = cambios;
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!this.cambiosNoGuardados) {
        this.mostrar();
      }
    });
  }

  public mostrar(): void {

    const user_id = this.userService.getUser();
    if (!this.cambiosNoGuardados) {
    if (user_id !== null) { 
      this.notasService.consultarNotaPorId(user_id).subscribe({
        next: (response: any) => {
          
          console.log(response);
          this.notas = response.map((nota: any) => ({ ...nota, id: nota.id }));
          this.nota = true;
          console.log(this.notas);
        },
        error: (error: any) => {
          console.error("Error al consultar las notas", error);
        }
      
      });
    }}
  }
  
  public formatoFecha(fecha: string | null): string {
    if (!fecha){
      return "";
    }
    const partesFecha = fecha.split('-'); 
    const año = partesFecha[0];
    const mes = partesFecha[1];
    const día = partesFecha[2];
    // Formatea a dd/mm/yy:
    return `${día}/${mes}/${año}`;
  }


  public borrarSeleccion(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const notasSeleccionadas = this.notasList.selectedOptions.selected;
        if (notasSeleccionadas.length === 0) {
          console.error("No se ha seleccionado ninguna nota");
          return;
        }
        notasSeleccionadas.forEach((nota: any) => {
          const notaSeleccionada = nota.value as any;
          if (notaSeleccionada.id) {
            // const url = `http://localhost/API/index.php/notas/${notaSeleccionada.id}`;
            // console.log(url);
            this.notasService.eliminarNotas(notaSeleccionada.id).subscribe({
              next: (response: any) => {
                console.log(response);
                //console.log(response.headers.get('Content-Type'));
                this.mostrar();
              },
              error: (error: any) => {
                console.error("Error al eliminar la nota", error);
              }
            });
          } 
        });
      }
    });
  }
  
}
