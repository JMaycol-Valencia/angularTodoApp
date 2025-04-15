import { CommonModule } from '@angular/common';
import { Component, computed,effect, Injector, inject, signal } from '@angular/core';

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

  tasks = signal<Task[]> (
    [
      // {
      //   id: Date.now(),
      //   tittle: 'Task 1',
      //   completed: false
      // },
      // {
      //   id: Date.now(),
      //   tittle: 'Task 2',
      //   completed: false
      // }
    ]
  );

    //Asignacion de valores unicos para el string
    filter = signal<'all' | 'pending' | 'completed'>('all');

    //SEÑAL EN BASE A OTRAS SEÑALES QUE SE EJECUTARA
    taskByFilter = computed(() => {
      //OBTENEMOS EL FILTRO Y LAS TAREAS
      const filter = this.filter();
      const tasks = this.tasks();


      if(filter === 'pending'){
        return tasks.filter(task => !task.completed);
      }
      if(filter === 'completed'){
        return tasks.filter(task => task.completed);
      }
      return tasks;
    })

    injector = inject(Injector);

    //UN EFFECT NO RETORNA PERO LO QUE SI HACE ES TRACKEAR ALGUN CAMBIO Y ALMACENARLO
    //puede ser definido en el constructor o en el ngOnInit o como una funcion
    constructor() {
      
    }

    //METODO DE IMPORTANTE DE NUESTRO CICLO DE VIDA DEL COMPONENTE
    ngOnInit(){
      const storage = localStorage.getItem('tasks');
      if(storage){
        const tasks = JSON.parse(storage)
        this.tasks.set(tasks)
      }
      this.trackTasks();
    }

    trackTasks(){
      effect(() => {
        const tasks = this.tasks();
        console.log(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks))
      }, { injector: this.injector});
    }

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

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter);
  }
}
