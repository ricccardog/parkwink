import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Rental } from './rentals';

@Injectable({
  providedIn: 'root'
})

export class RentalsService {

  rentalUrl = 'http://localhost:8000/api/rentals';

  constructor(private http: HttpClient) { }

  //GET
  getRentals(pagination?): Observable <Rental[]> {
    return this.http.get<Rental[]>(this.rentalUrl, { params : pagination})
  }
  //GET COLLECTION SIZE
  getCollectionSize() : Observable<number> {
    return this.http.get<number>(`${this.rentalUrl}/collectionSize`);
  }
  //POST
  addRental(rental: Rental): Observable<Rental>{
    return this.http.post<Rental>(this.rentalUrl, rental)
  }
  //DELETE
  deleteRental(id: number): Observable<{}> {
    const url = `${this.rentalUrl}/${id}` ;
    return this.http.delete(url)
  }
  //PUT
  updateRental(rental: Rental): Observable<Rental> {
    const url = this.rentalUrl + '/' + rental.id;
    return this.http.put<Rental>(url, rental)
  }
  //READ
  readRental(id: number): Observable<Rental> {
    const url = this.rentalUrl +'/' + id;
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