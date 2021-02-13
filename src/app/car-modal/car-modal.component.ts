import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CarService } from '../car.service';
import { Car } from '../cars';

@Component({
  selector: 'app-car-modal',
  templateUrl: './car-modal.component.html',
  styleUrls: ['../detailStyle.css']
})
export class CarModalComponent implements OnInit {

  @Output() addedCar = new EventEmitter<Car>();

  carForm = new FormGroup({
    model: new FormControl(''),
    maker: new FormControl(''),
    price: new FormControl('', Validators.min(1)),
    creationDate: new FormControl('')
  }, {
    validators: [this.missingFields]
  });

  constructor(
    private modalService: NgbModal,
    private carService: CarService) {

  }

  ngOnInit(): void {
  }

  //OPEN MODAL
  open(content) {
    this.modalService.open(content)
  }

  //POST
  addCar(): void {
    this.carService
      .addCar(this.carForm.value)
      .subscribe(data => { this.carService.getCars() });
    
     this.addedCar.emit(this.carForm.value as Car);

    this.carForm.reset();


    this.modalService.dismissAll();
  }
  
  //MISSING FIELDS VALIDATION
  missingFields(control: FormGroup): ValidationErrors {
    const maker = control.get('maker');
    const model = control.get('model');
    const price = control.get('price');
    const creationDate = control.get('creationDate');

    if (maker.value && model.value && price.value && creationDate.value) return null
    else return { missingFields: true }
  }

  //MINIMUM DATE VALIDATION optional  
  /* minDate(control: FormGroup): ValidationErrors {
    const creationDate = new Date(control.get('creationDate').value);
    const minDate = new Date(1900, 0, 1);
    if (creationDate && creationDate >= minDate) return null
    else return { minDate: true }
  } */
}
