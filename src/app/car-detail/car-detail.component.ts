import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


import { Car } from '../cars';
import { CarService } from '../car.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['../detailStyle.css']
})
export class CarDetailComponent implements OnInit {

  car: Car;
  editCar = {} as Car;
  deletionCar = {} as Car;
  carForm: FormGroup;
  editMode = false;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    this.getData();
  }

  //GET DATA
  getData(): void {
    this.car = this.route.snapshot.data.carResolve[0] as Car;
    
    this.editCar.id = this.car.id;
    this.deletionCar.id = this.car.id;
  }

  //NAVIGATE BACK
  goBack(): void {
    this.location.back();
    //this.location.back();
  }

  //DELETE
  deleteCar(): void {
    
    if (confirm(`Are you sure you want to delete car ${this.car.model} ${this.car.maker} ?`)) {
      this.carService
        .deleteCar(this.car.id)
        .subscribe(data => { alert('Car successfully deleted') }); 
    }
  }

  //UPDATE
  updateCar(): void {
    if (confirm('Are you sure you want to update this car?')) {
      this.carService
        .updateCar(this.editCar)
        .subscribe(car => { alert('Car successfully edited') })
    }
    this.carService
      .readCar(this.editCar.id)
      .subscribe(data => this.car = data)
    
  }
  //TOGGLE EDIT MODE
  startEditing(){
    this.editMode = !this.editMode;
  }

}
