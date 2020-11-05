import { Injectable } from '@angular/core';
import { Customer } from './customers';
import { CUSTOMERS } from './mock-customers';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

 

  getCustomers(text: string): Observable <Customer[]> {
    return of(CUSTOMERS.filter(
      customer => customer.name.toLowerCase().includes(text)
      || customer.surname.toLowerCase().includes(text)))
  }
  
}
