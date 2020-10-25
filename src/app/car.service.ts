import { Injectable } from '@angular/core';
import { Car } from './cars';
import { CARS } from './mock-cars';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }


getCars() : Observable<Car[]> {

  return of(CARS);
}
}
