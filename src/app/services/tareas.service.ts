import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private selectedTareasMap = new Map<number, BehaviorSubject<number>>();

  constructor() { }

  private tareaAgregadaSource = new Subject<void>();
  tareaAgregada$ = this.tareaAgregadaSource.asObservable();

  emitirTareaAgregada() {
    this.tareaAgregadaSource.next();
  }

  updateSelectedTareas(projectId: number, count: number) {
    let projectSubject = this.selectedTareasMap.get(projectId);
    if (!projectSubject) {
      projectSubject = new BehaviorSubject<number>(0);
      this.selectedTareasMap.set(projectId, projectSubject);
    }
    projectSubject.next(count);
  }

  getSelectedTareas$(projectId: number) {
    return this.selectedTareasMap.get(projectId) || new BehaviorSubject<number>(0);
  }
}
