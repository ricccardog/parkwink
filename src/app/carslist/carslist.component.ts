import { Component, OnInit } from '@angular/core';
import { Car } from '../cars';
import { CarService } from '../car.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.css']
})

export class CarslistComponent implements OnInit {

  cars: Car[] = []; 

  pagination = { 
    pageNo : 1,
    size : 4,
    toSort : '_id',
    order : -1
  }
  searched = false;
  collectionSize : number;
  byModel = false;
  byPrice = false;
  arrow : string;

  constructor(private carService : CarService) {
  }

  ngOnInit() : void {
    this.getCars(this.pagination);
    this.getColl();
  }
 
  //GET
  getCars(pagination): void {
    this.searched = false;
    this.carService
      .getCars(this.pagination)
      .subscribe(data => { this.cars = data })
  }
  //GET COLLECTION LENGTH
  getColl() : void {
    this.carService
        .getCars()
        .subscribe(data => {this.collectionSize = data.length })
  }
  //REFRESH AFTER ADDING
  refreshCars() {
    this.getCars(this.pagination);
    this.getColl();
  }
  //SEARCH
  searchCar(event): void {
    this.searched = true;
    this.carService
        .searchCar(event)
        .subscribe(data => {this.cars = data});
  }
  //SORT
  sortByModel() {
    this.byModel = true;
    this.byPrice = false;
    this.pagination.order = -this.pagination.order;
    this.pagination.toSort = "model";
    this.setArrow();
    this.getCars(this.pagination);
    this.getColl();
  }
  sortByPrice() {
    this.byPrice = true;
    this.byModel = false;
    this.pagination.order = -this.pagination.order;
    this.pagination.toSort = "price";
    this.setArrow();
    this.getCars(this.pagination);
    this.getColl();
  }
  setArrow(){
    if(this.pagination.order===1) this.arrow = "↑";
    else this.arrow = "↓";
  }
  
}

