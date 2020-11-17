import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Customer } from './customers';
import { stringify } from 'querystring';

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

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customerUrl, customer)
  }

  deleteCustomer(_id: string): Observable<{}> {
    const url = `${this.customerUrl}/${_id}` ;
    return this.http.delete(url)
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    const url = this.customerUrl + '/' + customer._id;
    return this.http.put<Customer>(url, customer)
  }
 
  readCustomer(customer: Customer): Observable<Customer> {
    const url = this.customerUrl +'/' + customer._id;
    return this.http.get<Customer>(url)
  }

  searchCustomer(nameTerm?: string, surnameTerm?: string, emailTerm?: string) : Observable<Customer[]> {
    
    nameTerm = nameTerm.trim();
    surnameTerm = surnameTerm.trim();
    emailTerm = emailTerm.trim();

    let options = new HttpParams();
    
      if(nameTerm) {
        options = options.append('name', nameTerm)
      }
      if(surnameTerm) {
        options = options.append('surname', surnameTerm)
      }
      if(emailTerm) {
        options = options.append('email', emailTerm)
      }
    
    return this.http.get<Customer[]>(this.customerUrl, {params: options})
  }

  
  
}
