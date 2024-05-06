import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  @Input() nota: any;
  @Output() cambiosNoGuardados = new EventEmitter<boolean>();
  notaOriginal: any;

  constructor(public dialogRef: MatDialogRef<DetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private notesService: NotesService) { }

  ngOnInit(): void {
    this.nota = this.data.nota;
    // Guarda copia de la nota original
    this.notaOriginal = { ...this.nota };
  }

  onNoClick(): void {
    // Emitir evento de cambios no guardados
    this.cambiosNoGuardados.emit(true);
    // Cancelar los cambios y cerrar
    this.nota = { ...this.notaOriginal };
    this.dialogRef.close();
  }

  guardarNota(): void {
    this.notesService.modificarNota(this.data.nota).subscribe(() => {
      this.notaOriginal = { ...this.nota };
      this.dialogRef.close();
    });
  }


    // public formatoFecha(fecha: string | null): string {
  //   if (!fecha){
  //     return "";
  //   }
  //   const partesFecha = fecha.split('-'); 
  //   const año = partesFecha[0];
  //   const mes = partesFecha[1];
  //   const día = partesFecha[2];
  //   // Formatea a dd/mm/yy:
  //   return `${día}/${mes}/${año}`;
  // }

}
