import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from '../cars';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-modal',
  templateUrl: './car-modal.component.html',
  styleUrls: ['./car-modal.component.css']
})
export class CarModalComponent implements OnInit {

  @Output() close = new EventEmitter<void>();
  newCar = {} as Car;
  carForm: FormGroup;

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
        .addCar(this.newCar)
        .subscribe(data => {this.carService.getCars()});
    this.close.emit();
    this.modalService.dismissAll();
  }

}
