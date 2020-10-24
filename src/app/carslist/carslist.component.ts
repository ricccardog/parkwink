import { Component, OnInit } from '@angular/core';

import { CARS } from '../mock-cars';
import { Car } from '../cars';



@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.css']
})

export class CarslistComponent implements OnInit {

  car = {} as Car;
  
  
  get cars() {
    return CARS;
  }

  constructor() {
    
  }

  ngOnInit(): void {
  }

  addCar(): void{
    this.car.id = CARS.length +1;
    CARS.push(this.car);
    this.car = {} as Car;

  }

}
