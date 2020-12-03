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
  sortOrder = '';
  stringSortTracker = 0;
  numSortTracker = 0;


  pagination = { 
    pageNo : 1,
    size : 4
  }
  collectionSize : number;

  constructor(private carService : CarService) {
  }

  ngOnInit() : void {
    this.getCars(this.pagination);
    this.getColl();
  }
 
  //GET
  getCars(pagination): void {
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
    this.carService
        .searchCar(event)
        .subscribe(data => {this.cars = data});
  }
  //SORT LIST
  sortByString() {
    this.stringSortTracker++;
    if (this.stringSortTracker % 2 == 0) {
      this.carService
        .getCars()
        .subscribe(data => {
          this.cars = data.sort((a, b) => a[this.sortOrder].localeCompare(b[this.sortOrder]))
        })
    } else {
      this.carService
        .getCars()
        .subscribe(data => {
          this.cars = data.sort((a, b) => b[this.sortOrder].localeCompare(a[this.sortOrder]))
        })
    }
  }
  sortByNumber() {
    this.numSortTracker++;
    if (this.numSortTracker % 2 == 0) {
      this.carService
        .getCars()
        .subscribe(data => {
          this.cars = data.sort((a, b) => { return a.price - b.price })
        })
    } else {
      this.carService
        .getCars()
        .subscribe(data => {
          this.cars = data.sort((a, b) => { return b.price - a.price })
        })
    }
  }
  

}

