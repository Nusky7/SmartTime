import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoProgressService {
  private projectProgressSubject = new BehaviorSubject<any>({});
  private selectedProjectSubject = new BehaviorSubject<any>(null);
  projectProgress$ = this.projectProgressSubject.asObservable();

  constructor() { }

  setProjectProgress(progress: any): void {
    this.projectProgressSubject.next(progress);
  }

  getProjectProgress(): Observable<any> {
    return this.projectProgressSubject.asObservable();
  }

  // Agregar esta propiedad
  getProyectoSeleccionado(): Observable<any> {
    return this.selectedProjectSubject.asObservable();
  }

  setSelectedProject(project: any): void {
    this.selectedProjectSubject.next(project);
  }
}
