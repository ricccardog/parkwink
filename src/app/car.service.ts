import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Car } from './cars';

@Injectable({
  providedIn: 'root'
})

export class CarService {

  carsUrl = 'http://localhost:3000/cars';
  collectionUrl = 'http://localhost:3000/countCars';

  constructor(private http: HttpClient) { }

  //GET
  getCars(pagination?) : Observable<Car[]> { 
    return this.http.get<Car[]>(this.carsUrl, { params : pagination})
  }
  //GET COLLECTION SIZE FROM SERVER
  getCollectionSize() : Observable<number> {
    return this.http.get<number>(this.collectionUrl);
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
  //PUT
  updateCar(car: Car): Observable<Car> {
    const url = this.carsUrl + '/' +  car._id;
    return this.http.put<Car>(url, car)
  }
  //READ
  readCar(id: string): Observable<Car> {
    const url = this.carsUrl + '/' +  id;
    return this.http.get<Car>(url)
  }
  //SEARCH
  searchCar(options): Observable<Car[]> {
    const par = this.toParams(options)
    return this.http.get<Car[]>(this.carsUrl, { params: par})
  }
  //OBJ -> PARAMS
  toParams(options): HttpParams {
    const opt = {};
    for(let k in options) {
      if(options[k]!='') {
        opt[k]=options[k]
      }
    }
    return new HttpParams( {fromObject: opt})
  }

}