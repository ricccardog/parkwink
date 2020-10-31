import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';

import { Customer } from '../customers';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent  implements OnInit{

  customers: Customer[];
  customerControl = new FormControl('');
  

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() : void {
    this.customerService.getCustomers()
        .subscribe(customers => this.customers = customers) ;
  }
}
