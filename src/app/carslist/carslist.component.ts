import { Component, OnInit } from '@angular/core';

import { Car } from '../cars';
import { CarService } from '../car.service';



@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.css']
})

export class CarslistComponent implements OnInit {

  cars: Car[]; //per far funzionare l'observable
  hiddenMenu= true;
  
 
  constructor(private carService : CarService) {
    
  }

  ngOnInit(): void {
    this.getCars();
  }

  getCars() : void {
    this.carService.getCars()
        .subscribe(cars => this.cars = cars) ; //senza ritorno, subscribe perché è un observable
  }

 expandMenu(){
   this.hiddenMenu=!this.hiddenMenu;
  }

}
