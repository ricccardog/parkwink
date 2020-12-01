import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.css']
})
export class CustomerModalComponent implements OnInit {

  @Output() close = new EventEmitter<void>();

  customerForm = new FormGroup({
    name : new FormControl('', Validators.required),
    surname : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
    drivingLicense : new FormControl('', Validators.required),
    birthDate : new FormControl('', Validators.required)
  })

  fieldCheck = {
    name : this.customerForm.get('name'),
    surname : this.customerForm.get('surname'),
    email : this.customerForm.get('email'),
    drivingLicense : this.customerForm.get('drivingLicense'),
    birthDate : this.customerForm.get('birthDate')
  }

  constructor(
    private modalService: NgbModal,
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
      .addCustomer(this.customerForm.value)
      .subscribe(data => { this.customerService.getCustomers() });
    this.close.emit();
    this.modalService.dismissAll();
  }

}
