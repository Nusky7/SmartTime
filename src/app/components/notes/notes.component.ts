import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotesService } from 'src/app/services/notes.service';
// import { Router, RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {

  nuevaNotaSubscription: Subscription = new Subscription();

  nota: any = { titulo:"", contenido:"", fechaCreacion:""};
  notas: any[] = [];
  mostrarForm: boolean = false;

  constructor(private notasService: NotesService) {}

  
  
  ngOnInit(): void {
  }

}