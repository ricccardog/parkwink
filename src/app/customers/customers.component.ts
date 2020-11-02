import { Component, OnInit} from '@angular/core';

import { Customer } from '../customers';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent  implements OnInit{

  customers: Customer[];
  customerText = '';
  

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(customerText?: string) : void {
    this.customerService.getCustomers(customerText)
        .subscribe(customers => this.customers = customers) ;
        this.customerText= '';
  }

  onModalClose() {
    this.getCustomers();
  }
}
