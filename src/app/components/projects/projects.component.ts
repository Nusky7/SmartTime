import { Component, OnInit, ChangeDetectorRef, ViewChild  } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor( private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  proyectoSeleccionadoId: number | null = null;  
  proyectosTareas: any[] = [];
  isMobile: boolean = false;
  @ViewChild('drawer') drawer: MatDrawer | undefined = undefined;

  // isDrawerOpen: boolean = false;

  // toggleDrawer() {
  //   this.isDrawerOpen = !this.isDrawerOpen;
  // }
  
  proyectoSeleccionado(proyectoId: number) {
    this.proyectoSeleccionadoId = proyectoId;
    if (this.isMobile && this.drawer) {
      this.drawer.toggle();
    }
  }

  isMobileDevice(): boolean {
    const userAgent = navigator.userAgent;
    if (/Mobi/i.test(userAgent) || /Android/i.test(userAgent)) {
      return true;
    }
    return false;
  }
  
  ngAfterViewInit(): void {
    this.isMobile = this.isMobileDevice();
    this.cdref.detectChanges();
  }
  
  }

  



