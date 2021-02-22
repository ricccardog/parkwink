import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Rental } from './rentals';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

  rentalUrl = 'http://localhost:3000/rentals';
  collectionUrl = 'http://localhost:3000/countRentals';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  //HANDLE HTTP ERRORS
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed, logging error:  ${error.message}`);
      return of(result as T);
    }
  }

  //GET
  getRentals(pagination?): Observable <Rental[]> {
    return this.http.get<Rental[]>(this.rentalUrl, { params : pagination})
      .pipe(
        catchError(this.handleError<Rental[]>('getRentals', []))
      );
  }
  //GET COLLECTION SIZE
  getCollectionSize(): Observable<number> {
    return this.http.get<number>(this.collectionUrl)
      .pipe(
        catchError(this.handleError<number>('getCollectionSize'))
      );
  }
  //POST
  addRental(rental: Rental): Observable<Rental>{
    return this.http.post<Rental>(this.rentalUrl, rental, this.httpOptions)
    .pipe(
      catchError(this.handleError<Rental>('addRental'))
    );
  }
  //DELETE
  deleteRental(_id: string): Observable<{}> {
    const url = `${this.rentalUrl}/${_id}` ;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<{}>('deleteRental'))
      );
  }
  //PUT
  updateRental(rental: Rental): Observable<Rental> {
    const url = this.rentalUrl + '/' + rental._id;
    return this.http.put<Rental>(url, rental, this.httpOptions)
      .pipe(
        catchError(this.handleError<Rental>('updateRental'))
      );
  }
  //READ
  readRental(id: string): Observable<Rental> {
    const url = this.rentalUrl +'/' + id;
    return this.http.get<Rental>(url)
    .pipe(
      catchError(this.handleError<Rental>(`readRental id=${id}`))
    );
  }
  //SEARCH
  searchRental(options): Observable<Rental[]> {
    const par = this.toParams(options)
    return this.http.get<Rental[]>(this.rentalUrl, {params:par})
  }
  //ONJ -> PARAMS
  toParams(options): HttpParams {
    const opt = options;
    for(let k in options){
      if(options[k]!=''){
        opt[k]=options[k]
      }
    }
    return new HttpParams ( { fromObject: opt} )
  }

}