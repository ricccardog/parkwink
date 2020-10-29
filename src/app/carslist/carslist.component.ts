import { Component, OnInit } from '@angular/core';

import { Car } from '../cars';
import { CarService } from '../car.service';
import { Observable } from 'rxjs';





@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.css']
})

export class CarslistComponent implements OnInit {

  cars: Car[]; //cars è un array di oggetti car (per observable)
  searchTerm= '';
  constructor(private carService : CarService) {
    
  }

  ngOnInit(): void {
    this.getCars();
  }


  getCars() : void {
    this.carService.getCars(this.searchTerm)
        .subscribe(cars => this.cars = cars) ; //senza ritorno, subscribe perché è un observable
  }
 

}
