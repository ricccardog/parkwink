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
  searchCustomer(options) : Observable<Customer[]> { 
  const par =  this.toParams(options)
  console.log('final call')
  return this.http.get<Customer[]>(this.customerUrl, {params: par})
  }

  //trsforma oggetto in parametri
  toParams(options) : HttpParams {
    console.log('data in service')
    const opt = {};
    for(let k in options) {
      if(options[k]!='') {
        opt[k]=options[k].toLowerCase();
      }
    }
    console.log('data to search params')
    return new HttpParams( {fromObject: opt})
  }

  
  
}
