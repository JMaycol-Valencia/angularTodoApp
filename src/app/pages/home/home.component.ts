import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]> ([
      {
        id: Date.now(),
        tittle: 'Task 1',
        completed: false
      },
      {
        id: Date.now(),
        tittle: 'Task 2',
        completed: false
      }
    ]);

  changeHanldler(event: Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
    input.value = '';
  }

  addTask(tittle : string){
    const newTask = {
      id: Date.now(),
      tittle,
      completed: false
  }
  this.tasks.update( tasks => [...tasks, newTask] );
}

  deleteHandler(index: number){
    this.tasks.update(tasks => tasks.filter((tasks, position) => position !== index ));
  }
}
