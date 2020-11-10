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
        .subscribe(data => {
          for(let item in data) {
            this.newCar.name=data[item].name;
            this.newCar.model=data[item].model;
            this.newCar.creationDate=data[item].creationDate;
            this.newCar.price=data[item].price;
            this.newCar.id=this.cars.length+1;
            this.cars.push(this.newCar);
            this.newCar = {} as Car;
          }
        })
  this.text = '';
  console.log(this.cars)
        
  }

  onModalClose() { //questo metodo viene richiamato da carform come @Output
    this.getCars(this.text);
  }
 

}
