import { Component, HostBinding, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  //Enlazar la clase al componente
  @HostBinding('class') className = "";
  


  //Definición de las variables que llaman a las clases
  lightClass = "theme-light";
  lightOneClass = "theme-light-one";
  darkClass = "theme-dark";
  darkOneClass = "theme-dark-one";
  smallScreen: boolean = false;

  //Tema por defecto
  tema = this.lightOneClass; 
  constructor() {}

  ngOnInit(): void {
    // document.body.classList.add(this.tema);
    this.smallScreen = window.innerWidth <= 720;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.smallScreen = window.innerWidth <= 720;
  }

  //Función que elimina la clase actual y añade la seleccionada
  //Se actualiza la variable para el tema por defecto
  cambioTema(theme: string): void {
    document.body.classList.remove(this.tema);
    document.body.classList.add(theme);
    this.tema = theme;
  }


  }



