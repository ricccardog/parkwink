import { Injectable } from '@angular/core';
import { Customer } from './customers';
import { CUSTOMERS } from './mock-customers';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  getCustomers(): Observable <Customer[]> {
    return of(CUSTOMERS);
  }
}
