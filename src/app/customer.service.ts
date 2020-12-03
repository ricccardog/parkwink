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
  getCustomers(pagination?): Observable <Customer[]> {   
    return this.http.get<Customer[]>(this.customerUrl, { params : pagination})
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
  readCustomer(id: string): Observable<Customer> {
    const url = this.customerUrl +'/' + id;
    return this.http.get<Customer>(url)
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
