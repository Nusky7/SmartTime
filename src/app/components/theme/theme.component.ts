import { Component, HostBinding, HostListener, OnInit, ViewChildren, ElementRef  } from '@angular/core';


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
    this.smallScreen = window.innerWidth <= 720;
  }

  temaInfo() {
    alert('Si te quedas atascado en un Tema Oscuro...⁉️\n\n1. Vuelve a seleccionar el mismo tema Oscuro. \n2. Selecciona el nuevo tema que quieras aplicar.');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.smallScreen = window.innerWidth <= 720;
  }

  //Se actualiza la variable para el tema por defecto
  cambioTema(theme: string): void {
    document.body.classList.remove(this.tema);
    this.tema = theme;
    document.body.classList.add(theme);
  }


  }



