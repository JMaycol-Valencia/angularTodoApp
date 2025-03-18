import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal([
      'instalar',
      'crear proyecto',
      'crear componente',
      'crear servicio',
    ]);

  changeHanldler(event: Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.tasks.update( tasks => [...tasks, newTask] );
    input.value = '';
  }

  deleteHandler(index: number){
    this.tasks.update(tasks => tasks.filter((tasks, position) => position !== index ));
  }
}
