import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private selectedTareas = new BehaviorSubject<number>(0);
  selectedTasks$ = this.selectedTareas.asObservable();

  constructor() { }

  updateSelectedTareas(count: number) {
    this.selectedTareas.next(count);
  }
}
