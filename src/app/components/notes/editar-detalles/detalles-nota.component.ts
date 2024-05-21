import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-detalles-nota',
  templateUrl: './detalles-nota.component.html',
  styleUrls: ['./detalles-nota.component.scss']
})
export class DetallesNotaComponent implements OnInit {

  @Input() nota: any;
  @Output() cambiosNoGuardados = new EventEmitter<boolean>();
  notaOriginal: any;

  constructor(public dialogRef: MatDialogRef<DetallesNotaComponent>,
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


}
