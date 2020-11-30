import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../customers';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.css']
})
export class CustomerModalComponent implements OnInit {

  @Output() close = new EventEmitter<void>();

  newCustomer = {} as Customer;
  customerForm: FormGroup;

  constructor(private modalService: NgbModal,
              private customerService: CustomerService) {
                
               }

  ngOnInit(): void {
  }
  //OPEN MODAL
  open(content) {
    this.modalService.open(content)
  }
  //POST
  addCustomer(): void {
    this.customerService
      .addCustomer(this.newCustomer)
      .subscribe(data => { this.customerService.getCustomers() });
    this.close.emit();
    this.modalService.dismissAll();
  }


}
