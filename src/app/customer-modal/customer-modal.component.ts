import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['../detailStyle.css']
})
export class CustomerModalComponent implements OnInit {

  @Output() addedCustomer = new EventEmitter<void>();

  customerForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl('', Validators.email),
    drivingLicense: new FormControl('', [Validators.min(1), Validators.max(10000)]),
    birthDate: new FormControl('')
  }, {
    validators: [this.missingFields, this.minDate]
  });

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
      .subscribe(data => { 
        console.log('Customer successfully added');
        this.addedCustomer.emit();
        this.customerForm.reset();
        this.modalService.dismissAll();
      });
        
  }

  //MINIMUM DATE VALIDATION
  minDate(control: FormGroup): ValidationErrors {
    const birthDate = new Date(control.get('birthDate').value);
    const minDate = new Date(1940, 0, 1);
    if (birthDate && birthDate >= minDate) return null
    else return { minDate: true }
  }

  //MISSING FIELDS VALIDATION
  missingFields(control: FormGroup): ValidationErrors {
    const name = control.get('name');
    const surname = control.get('surname');
    const birthDate = control.get('birthDate');
    const drivingLicense = control.get('drivingLicense');
    const email = control.get('email');

    if (name.value && surname.value && birthDate.value && drivingLicense.value && email.value) return null
    else return { missingFields: true }
  }


}
