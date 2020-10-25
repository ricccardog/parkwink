import { Component, OnInit } from '@angular/core';
import { Car } from '../cars';
import { CARS } from '../mock-cars';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carform',
  templateUrl: './carform.component.html',
  styleUrls: ['./carform.component.css']
})
export class CarformComponent implements OnInit {

  car = {} as Car;
  
  constructor() { }

  ngOnInit(): void {
  }

  
  addCar(): void{
    this.car.id = CARS.length +1;
    CARS.push(this.car);
    this.car = {} as Car;
  }

  checker(){
    console.log(this.car);
  }

}

