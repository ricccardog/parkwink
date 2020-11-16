import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
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

  searchCustomer(text: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl)
      .pipe(map(data =>
        data = data.filter(x => x.name.toLowerCase().includes(text)
          || x.surname.toLowerCase().includes(text)
          || x.birthDate.toString().includes(text)
          || x.drivingLicense.toString().includes(text))
      ))
  }
  
}
