import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ResolverService } from '../resolver.service';

import { Car } from '../cars';
import { CarService } from '../car.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: Car;
  fields = ['model', 'maker']
  editCar = {} as Car;
  carForm: FormGroup;

  constructor(
    private carService : CarService,
    private resolver : ResolverService,
    private route : ActivatedRoute,
    private location : Location,
    private modal : NgbModal,
  ) { }

  ngOnInit(): void {
    this.car = this.route.snapshot.data.carResolve as Car;
    this.editCar._id = this.car._id;
  }

  //OPEN UPDATE MODAL
  open(content) {
    this.modal.open(content)
  }
  //NAVIGATE BACK
  goBack(): void{
    this.location.back();
  }
  //DELETE
  deleteCar(): void {
    if(confirm(`Are you sure you want to delete car ${this.car.model} ${this.car.maker} ?`)){
      this.carService
          .deleteCar(this.car._id)
          .subscribe(data => { alert('Car successfully deleted')})
    }
  }
  //UPDATE
  updateCar(): void {
    if (confirm('Are you sure you want to update this car?')) {
      this.carService
        .updateCar(this.editCar)
        .subscribe(car => { alert('Car successfully edited') })
    }
    this.modal.dismissAll();
  }
  
}
