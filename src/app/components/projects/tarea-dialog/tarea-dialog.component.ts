import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProyectosComponent } from '../proyectos/proyectos.component';
import { ProyectosService } from '../../../services/proyectos.service';

@Component({
  selector: 'app-tarea-dialog',
  templateUrl: './tarea-dialog.component.html',
  styleUrls: ['./tarea-dialog.component.scss']
})
export class TareaDialogComponent implements OnInit {

  parent: ProyectosComponent;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  proyecto_id: number;


  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TareaDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) data: { parent: ProyectosComponent, proyecto_id: number },  private proyectosService: ProyectosService
  ) {
    this.parent = data.parent;
    this.proyecto_id = data.proyecto_id;
    this.firstFormGroup = this._formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['']
      
    });
    this.secondFormGroup = this._formBuilder.group({
      estado: ['pendiente', Validators.required],
      prioridad: [1, Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      fechaVencimiento: [null, Validators.required]
    });

  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  crearTarea(): void {

    const tareaData = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
      completado: false,
      proyecto_id: this.proyecto_id
    };
    console.log(tareaData.proyecto_id);
    this.proyectosService.crearTarea(tareaData).subscribe({
      next: (response) => {
        console.log(response);
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  
  
  onSave(parent: ProyectosComponent): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      this.crearTarea();
      parent.actualizarTareas();
    }
  }
  
}
