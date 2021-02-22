import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Customer } from './customers';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  customerUrl = 'http://localhost:3000/customers';
  collectionUrl = 'http://localhost:3000/countCustomers';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  //HANDLE HTTP ERRORS
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed, logging error: ${error.message}`);
      return of(result as T);
    }
  }

  //GET
  getCustomers(pagination?): Observable <Customer[]> {   
    return this.http.get<Customer[]>(this.customerUrl, { params : pagination})
      .pipe(
        catchError(this.handleError<Customer[]>('getCustomers', []))
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
  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customerUrl, customer, this.httpOptions)
      .pipe(
        catchError(this.handleError<Customer>('addCustomer'))
      );
  }
  //DELETE
  deleteCustomer(_id: string): Observable<{}> {
    const url = `${this.customerUrl}/${_id}` ;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<{}>('deleteCustomer'))
      );
  }
  //PUT
  updateCustomer(customer: Customer): Observable<Customer> {
    const url = this.customerUrl + '/' + customer._id;
    return this.http.put<Customer>(url, customer, this.httpOptions)
      .pipe(
        catchError(this.handleError<Customer>('updateCustomer'))
      );
  }
  //READ
  readCustomer(id: string): Observable<Customer> {
    const url = this.customerUrl +'/' + id;
    return this.http.get<Customer>(url)
    .pipe(
      catchError(this.handleError<Customer>(`readCustomer id=${id}`))
    );
  }
  //SEARCH
  searchCustomer(options): Observable<Customer[]> { 
    const par =  this.toParams(options)
    return this.http.get<Customer[]>(this.customerUrl, {params: par})
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
