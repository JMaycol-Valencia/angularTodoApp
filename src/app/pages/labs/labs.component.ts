import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  variable1 = "Hola";
  tasksSinSignal = [
    'instalar',
    'crear proyecto',
    'crear componente',
    'crear servicio',
  ]

  tasks = signal([
    'instalar',
    'crear proyecto',
    'crear componente',
    'crear servicio',
  ])

  name = signal("Maycol");
  nameSinSignal = "Maycol";
  edad = 27;
  img = "https://w3schools.com/howto/img_avatar.png";
  state = true;
  person = {
    name: "Maycol",
    age: 27,
    img: "https://w3schools.com/howto/img_avatar.png",
    state: true
  }

  clickHandler(){
    alert('Hola');
  }

  changeHandler( event : Event ){
   const input = event.target as HTMLInputElement;
   const newValue = input.value;
   this.name.set(newValue);

   console.log(input.value); 
  }

  keydowHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}
