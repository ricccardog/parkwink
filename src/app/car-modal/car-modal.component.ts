import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-modal',
  templateUrl: './car-modal.component.html',
  styleUrls: ['./car-modal.component.css']
})
export class CarModalComponent implements OnInit {

  @Output() close = new EventEmitter<void>();
  
  
  carForm = new FormGroup({
    model : new FormControl('', Validators.required),
    maker : new FormControl('', Validators.required),
    price : new FormControl( '' , Validators.required),
    creationDate : new FormControl ('', Validators.required)
  })

  fieldCheck = { 
    model : this.carForm.get('model'),
    maker : this.carForm.get('maker'),
    creationDate : this.carForm.get('creationDate'),
    price : this.carForm.get('price')
  }

  constructor(private modalService: NgbModal, private carService: CarService) { }

  ngOnInit(): void {
  }
  //OPEN MODAL
  open(content) {
    this.modalService
        .open(content)
  }
  //POST
  addCar(): void {
    this.carService
        .addCar(this.carForm.value)
        .subscribe(data => {this.carService.getCars()});
    this.close.emit();
    this.modalService.dismissAll();
  }
  
  
}
