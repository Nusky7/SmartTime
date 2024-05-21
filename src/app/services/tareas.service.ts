import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private selectedTareasMap = new Map<number, BehaviorSubject<number>>();

  constructor() { }

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
