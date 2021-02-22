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
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.getData();
    if((this.car.maker || this.car.model) == undefined){
      this.router.navigate(['404']);
    }
  }

  //GET DATA
  getData(): void {
    this.car = this.route.snapshot.data.carResolve as Car;
    this.editCar._id = this.car._id;
    this.deletionCar._id = this.car._id;  
  }

  //NAVIGATE BACK
  goBack(): void {
    this.location.back();
  }

  //DELETE
  deleteCar(): void {
    if (confirm(`Are you sure you want to delete car ${this.car.model} ${this.car.maker} ?`)) {
/*       this.deletionCar = {_id: this.car._id, model: null, maker: null, price: null, creationDate: null} */
      this.carService
        .deleteCar(this.car._id)
        .subscribe(data => { alert('Car successfully deleted') })
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
      .readCar(this.editCar._id)
      .subscribe(data => this.car = data)
      
    this.startEditing();
  }
  startEditing(){
    this.editMode = !this.editMode;
  }

}
