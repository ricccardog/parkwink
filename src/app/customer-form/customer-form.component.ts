import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Customer } from '../customers';
import { CUSTOMERS } from '../mock-customers';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersComponent } from '../customers/customers.component';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

@Output() close = new EventEmitter<void>();

  newCustomer = {} as Customer;
  customerForm : FormGroup;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  addCustomer(){
    this.newCustomer.id = CUSTOMERS.length +1;
    CUSTOMERS.push(this.newCustomer);
    this.newCustomer = {} as Customer;
    this.close.emit();
    this.modalService.dismissAll();
  }

}
