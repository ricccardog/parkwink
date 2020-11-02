import { Injectable } from '@angular/core';
import { Car } from './cars';
import { CARS } from './mock-cars';
import { Observable,of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarService {



  constructor() { }

  getCars(text?: string) : Observable<Car[]> { //il metodo ritorna un observable di array cars
    const term = (text || '').toLowerCase();
    return of(CARS.filter(
       car => car.name.toLowerCase().includes(term) 
    || car.model.toLowerCase().includes(term)
    || car.price.toString().includes(term)
    || car.creationDate.getDay().toString().includes(term)
    || car.creationDate.getMonth().toString().includes(term)
    || car.creationDate.getFullYear().toString().includes(term)
      )
    )
  }

 
}
