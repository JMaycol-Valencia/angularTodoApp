import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   newTaskControl =  new FormControl('tarea', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
   })

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

    //MODIFICAMOS EL METODO USANDO FORMCONTROL
  changeHanldler(){
    if(this.newTaskControl.valid){
      const value  = this.newTaskControl.value.trim();
      if(value !== ''){
        this.addTask(value);
        this.newTaskControl.setValue('');     
      }
    }
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

  updateTask(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === index){
          return{
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }

  updateTaskEditingMode(index: number){
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if(position === index){
          return{
            ...task,
            editing: true
        }
      }
      //LIMITANDO LA CANTIDAD DE TAREAS CON EL ESTADO DE EDICION ACTIVO
        return {
          ...task,
          editing: false
        };
      })
    });
  }

  updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if(position === index){
          return{
            ...task,
            tittle: newValue,
            editing: false
        }
      }
        return task;
      })
    });
  }
}
