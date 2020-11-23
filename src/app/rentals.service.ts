import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Rental } from './rentals';
import { Car } from './cars';
import { Customer } from './customers';
import { RentalFilter } from './rentalFilter';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

  rentalUrl = 'http://localhost:3000/rentals';

  constructor(private http: HttpClient) { }

  //GET
  getRentals(): Observable <Rental[]> {
    return this.http.get<Rental[]>(this.rentalUrl)
  }
  //POST
  addRental(rental: Rental): Observable<Rental>{
    return this.http.post<Rental>(this.rentalUrl, rental)
  }
  //DELETE
  deleteRental(_id: string): Observable<{}> {
    const url = `${this.rentalUrl}/${_id}` ;
    return this.http.delete(url)
  }
  //READ
  readRental(rental: Rental): Observable<Rental> {
    const url = this.rentalUrl +'/' + rental._id;
    return this.http.get<Rental>(url)
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