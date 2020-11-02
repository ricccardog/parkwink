import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Customer } from '../customers';
import { CUSTOMERS } from '../mock-customers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.css']
})
export class CustomerModalComponent implements OnInit {

  @Output() close = new EventEmitter<void>();

  customer = {} as Customer;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'customer-modal-title'})
  }

  addCustomer(): void {
    this.customer.id = CUSTOMERS.length +1;
    CUSTOMERS.push(this.customer);
    this.customer= {} as Customer;
    this.modalService.dismissAll();
    this.close.emit();
  }
}
