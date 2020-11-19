import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Customer } from './customers';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  customerUrl = 'http://localhost:3000/customers';
  
        

  constructor(private http: HttpClient) { }

  //GET
  getCustomers(): Observable <Customer[]> {   
    return this.http.get<Customer[]>(this.customerUrl)
  }
  //POST
  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customerUrl, customer)
  }
  //DELETE
  deleteCustomer(_id: string): Observable<{}> {
    const url = `${this.customerUrl}/${_id}` ;
    return this.http.delete(url)
  }
  //PUT
  updateCustomer(customer: Customer): Observable<Customer> {
    const url = this.customerUrl + '/' + customer._id;
    return this.http.put<Customer>(url, customer)
  }
  //READ
  readCustomer(customer: Customer): Observable<Customer> {
    const url = this.customerUrl +'/' + customer._id;
    return this.http.get<Customer>(url)
  }
  //SEARCH
  searchCustomer(values: {}) : Observable<Customer[]> {
  let options = new HttpParams( {fromObject: values}); 
  return this.http.get<Customer[]>(this.customerUrl, {params: options})
  }

  
  
}
