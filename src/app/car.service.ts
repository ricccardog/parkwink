import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Car } from './cars';

@Injectable({
  providedIn: 'root'
})

export class CarService {

  carsUrl = 'http://localhost:3000/cars';

  constructor(private http: HttpClient) { }

  //GET
  getCars() : Observable<Car[]> { //il metodo ritorna un observable di array cars
    return this.http.get<Car[]>(this.carsUrl)
  }

  //POST
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.carsUrl, car)
  }

  //DELETE
  deleteCar(_id: string): Observable<{}> {
    const url = `${this.carsUrl}/${_id}`;
    return this.http.delete(url)
  }

  //UPDATE
  updateCar(car: Car): Observable<Car> {
    const url = this.carsUrl + '/' +  car._id;
    return this.http.put<Car>(url, car)
  }

  //READ
  readCar(car: Car): Observable<Car> {
    const url = this.carsUrl + '/' +  car._id;
    return this.http.get<Car>(url)
  }

}
