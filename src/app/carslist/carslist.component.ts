import { Component, OnInit } from '@angular/core';

import { Car } from '../cars';
import { CarService } from '../car.service';



@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.css']
})

export class CarslistComponent implements OnInit {

  cars: Car[]; //cars è un array di oggetti car (per observable)
  
  constructor(private carService : CarService) {
    
  }

  ngOnInit(): void {
    this.getCars();
  }


  getCars() : void {
    this.carService.getCars()
        .subscribe(cars => this.cars = cars) ; //senza ritorno, subscribe perché è un observable
  }

 

}
