import { Component, OnInit } from '@angular/core';

import { Car } from '../cars';
import { CarService } from '../car.service';

@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.css']
})
export class CarslistComponent implements OnInit {

  cars: Car[] = []; 

  carId = '';

  selectCar : Car;

  constructor(private carService : CarService) {
    
  }

  ngOnInit() : void {
    this.getCars();
  }


  getCars(): void {
    this.carService
      .getCars()
      .subscribe(data => { this.cars = data })
  }

  deleteCar(): void {
    this.carService
      .deleteCar(this.carId)
      .subscribe(car => { this.getCars() })
  }

  updateCar(): void {
    this.carService
      .updateCar(this.selectCar)
      .subscribe(car => { this.getCars })
  }

  addCar(): void {
    this.carService
      .addCar(this.selectCar)
      .subscribe(car => { this.getCars() })
  }

  onModalClose() { //questo metodo viene richiamato da carform come @Output
    this.getCars();
  }

}
