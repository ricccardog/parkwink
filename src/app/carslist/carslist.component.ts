import { Component, OnInit } from '@angular/core';

import { Car } from '../cars';
import { CarService } from '../car.service';


@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.css']
})
export class CarslistComponent implements OnInit {

  cars: Car[] = []; //cars è un array di oggetti car (per observable)
  newCar = {} as Car;
  text = '';

  constructor(private carService : CarService) {
    
  }

  ngOnInit(): void {
    this.getCars('');
  }

  getCars(text: string) : void {
    this.carService.getCars(text)
        .subscribe(data => {this.cars = data})      
  }

  onModalClose() { //questo metodo viene richiamato da carform come @Output
    this.getCars(this.text);
  }
 

}
