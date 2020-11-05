import { Injectable } from '@angular/core';
import { Car } from './cars';
import { CARS } from './mock-cars';
import { Observable,of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarService {



  constructor() { }

  getCars(text: string) : Observable<Car[]> { //il metodo ritorna un observable di array cars
    return of(CARS.filter(
       car => car.name.toLowerCase().includes(text) 
    || car.model.toLowerCase().includes(text)))
  }

 
}
