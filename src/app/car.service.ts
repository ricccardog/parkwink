import { Injectable } from '@angular/core';
import { Car } from './cars';
import { CARS } from './mock-cars';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  getCars(searchTerm: string = '') : Observable<Car[]> { //il metodo ritorna un observable di array cars
    const term = searchTerm.toLowerCase();
    return of(CARS.filter(c => c.name.toLowerCase().includes(searchTerm) || searchTerm === '')); //prende dal mock CARS usando "of"
  }

}
