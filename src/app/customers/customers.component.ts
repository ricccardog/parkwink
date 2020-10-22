import { Component, OnInit } from '@angular/core';

import { CUSTOMERS } from '../mock-customers';
import { Customer } from '../customers';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers= CUSTOMERS;
  
  constructor() { }

  ngOnInit(): void {
  }
 
}
