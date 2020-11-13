import { Injectable } from '@angular/core';
import { Car } from './cars';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  carsUrl = 'http://localhost:3000/cars'

  constructor(private http: HttpClient) { }

  getCars(text: string) : Observable<Car[]> { //il metodo ritorna un observable di array cars
    return this.http.get<Car[]>(this.carsUrl)
  /*   .filter(
       car => car.name.toLowerCase().includes(text) 
    || car.model.toLowerCase().includes(text))) */
  }

 
}
