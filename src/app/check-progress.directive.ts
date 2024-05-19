import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from './components/projects/content/content.component';

@Directive({
  selector: '[appCheckProgress]'
})
export class CheckProgressDirective implements OnChanges {

  @Input('appCheckProgress') tasks: Task[];
  private progress: number;

  constructor(private el: ElementRef) {
    this.tasks = [];
    this.progress = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks']) {
      this.updateProgress();
    }
  }

  private updateProgress(): void {
    const completedTasks = this.tasks.filter(task => task.completado).length;
    this.progress = (completedTasks / this.tasks.length) * 100;
    this.el.nativeElement.style.width = `${this.progress}%`;
  }
}
