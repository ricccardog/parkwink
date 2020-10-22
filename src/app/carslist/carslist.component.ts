import { Component, OnInit } from '@angular/core';

import { CARS } from '../mock-cars';
import { Car, extraCar } from '../cars';



@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.css']
})

export class CarslistComponent implements OnInit {

  cars = CARS; 
  extraCar= new extraCar();


  constructor() {}

  ngOnInit(): void {
  }

  addCar(): void{
    this.extraCar.id=CARS.length;
    CARS.push(this.extraCar);
  }

}
