import { Component, OnInit } from '@angular/core';
import { Car } from '../cars';
import { CarService } from '../car.service';

@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.css']
})

export class CarslistComponent implements OnInit {

  cars: Car[] = [];


  pagination = {
    pageNo: 1,
    size: 4,
    toSort: '_id',
    order: -1
  }

  searched = false;
  collectionSize: number;
  byModel = false;
  byPrice = false;
  arrow: string;
  skip: number;
  limit: number;
  checker: number;

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    this.getColl();
    this.getCars();
  }

  //GET
  getCars(): void {
    this.sliceParams();
    if (!this.cars[this.skip]) {
      this.carService
        .getCars(this.pagination)
        .subscribe(data => {
          for (let i = 0; i < 4; i++) {
            this.checker = this.skip + i;
            if (!this.cars[this.checker] && this.checker <= this.collectionSize) {
              this.cars[this.checker] = data[i];
            }
          }
        })
    }
  }

  //SLICE PARAMETERS
  sliceParams() {
    this.skip = (this.pagination.pageNo - 1) * this.pagination.size;
    this.limit = this.pagination.size * this.pagination.pageNo;
    if (this.limit > this.collectionSize && this.collectionSize) this.limit = this.collectionSize;

  }

  //GET COLLECTION LENGTH
  getColl(): void {
    this.carService
      .getCars()
      .subscribe(data => { this.collectionSize = data.length; });
  }

  //REFRESH AFTER ADDING
  refreshCars() {
    this.getCars();
    this.getColl();
  }
  //SEARCH
  searchCar(event): void {
    this.searched = true;
    this.carService
      .searchCar(event)
      .subscribe(data => { this.cars = data });
  }
  //SORT
  sortByModel() {
    this.byModel = true;
    this.byPrice = false;
    this.pagination.order = -this.pagination.order;
    this.pagination.toSort = "model";
    this.setArrow();
    this.getCars();
    this.getColl();
  }
  sortByPrice() {
    this.byPrice = true;
    this.byModel = false;
    this.pagination.order = -this.pagination.order;
    this.pagination.toSort = "price";
    this.setArrow();
    this.getCars();
    this.getColl();
  }
  setArrow() {
    if (this.pagination.order === 1) this.arrow = "↑";
    else this.arrow = "↓";
  }

}

