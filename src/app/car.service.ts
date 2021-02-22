import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Car } from './cars';

@Injectable({
  providedIn: 'root'
})

export class CarService {

  carsUrl = 'http://localhost:3000/cars';
  collectionUrl = 'http://localhost:3000/countCars';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  //HANDLE HTTP ERRORS
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed, logging error: ${error.message}`);
      return of(result as T);
    };
  }

  //GET
  getCars(pagination?) : Observable<Car[]> { 
    return this.http.get<Car[]>(this.carsUrl, { params : pagination})
      .pipe(
        catchError(this.handleError<Car[]>('getCars', []))
      );
  }
  //GET COLLECTION SIZE FROM SERVER
  getCollectionSize() : Observable<number> {
    return this.http.get<number>(this.collectionUrl)
      .pipe(
        catchError(this.handleError<number>('getCollectionSize'))
      );
  }
  //POST
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.carsUrl, car, this.httpOptions)
      .pipe(
        catchError(this.handleError<Car>('addCar'))
      );
  }
  //DELETE
  deleteCar(_id: string): Observable<{}> {
    const url = `${this.carsUrl}/${_id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<{}>('deleteCar'))
      );
  }
  //PUT
  updateCar(car: Car): Observable<Car> {
    const url = this.carsUrl + '/' +  car._id;
    return this.http.put<Car>(url, car, this.httpOptions)
      .pipe(
        catchError(this.handleError<Car>('updateCar'))
      );
  }
  //READ
  readCar(id: string): Observable<Car> {
    const url = this.carsUrl + '/' +  id;
    return this.http.get<Car>(url)
    .pipe(
      catchError(this.handleError<Car>(`readCar id=${id}`))
    );
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