import { Component, OnInit, Output, EventEmitter} from '@angular/core';

import { Customer } from '../customers';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent  implements OnInit{


  customers$: Customer[];
  text= '';

  constructor(private customerService: CustomerService) { 

  }

  ngOnInit(): void { 
    this.getCustomers('');     
  }
  getCustomers(text: string) : void {
    this.customerService.getCustomers(text)
        .subscribe(customers => this.customers$ = customers);
  }

  //metodo per event emitter
  

  
}
