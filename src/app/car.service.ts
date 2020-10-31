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
    const term = (text || '').toLowerCase(); //se text è definito usa quello sennò usa una stringa vuota
    return of(CARS.filter(car => car.name.toLowerCase().includes(term) || term === '')); 
  } //filtra CARS cercando term o in alternativa setta term come stringa vuota restituendo il tutto

}
