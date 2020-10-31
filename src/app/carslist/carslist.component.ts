import { Component, OnInit, Input } from '@angular/core';

import { Car } from '../cars';
import { CarService } from '../car.service';




@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.css']
})

export class CarslistComponent implements OnInit {

  cars: Car[]; //cars è un array di oggetti car (per observable)
  searchText= '';

  constructor(private carService : CarService) {
    
  }

  ngOnInit(): void {
    this.getCars();
  }

  onSearch() {
    this.getCars();
  }

  getCars(searchText?: string) : void {
    this.carService.getCars(searchText)
        .subscribe(cars => this.cars = cars) ; //senza ritorno, subscribe perché è un observable
  }

  onModalClose() { //questo metodo viene richiamato da carform come @Output
    this.getCars();
  }
 

}
