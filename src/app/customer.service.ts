import { Injectable } from '@angular/core';
import { Customer } from './customers';
import { CUSTOMERS } from './mock-customers';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  getCustomers(customerText?: string): Observable <Customer[]> {
    const term = (customerText || '').toLowerCase();
    return of(CUSTOMERS.filter(
          customer => customer.name.toLowerCase().includes(term)
      ||  customer.surname.toLowerCase().includes(term)
      ||  customer.email.toLowerCase().includes(term)
      ||  customer.drivingLicense.toString().includes(term)
      )
    )
  }
  
}
