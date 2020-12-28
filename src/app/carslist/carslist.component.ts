import { Component, OnInit } from '@angular/core';
import { Car } from '../cars';
import { CarService } from '../car.service';
import { Pagination } from '../pagination';
import { CarFilter } from '../carFilter';

@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['../detailStyle.css']
})

export class CarslistComponent implements OnInit {

  cars: Car[] = []; 


  pag: Pagination = { 
    pageNo: 1,
    size: 4,
    toSort: '_id',
    order: -1
  }
  //SEARCH PROPERTIES
  searchOptions = {} as CarFilter;
  searched = false;
  showFilters = false;
  //GET PROPERTIES
  collectionSize: number;
  skip: number;
  limit: number;
  //SORT PROPERTIES
  sortParameter: string;
  arrow: string;
  sortOrder = true;
  


  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    this.getColl();
    this.getCars();
    this.resetOptions();
  }

  //GET
  getCars(): void {
    this.sliceParams();

    for (let i = this.skip; i < this.limit; i++) {

      if (this.cars[i]) {

        continue

      } else {

        this.carService
          .getCars(this.pag)
          .subscribe(data => {
            this.cars[i] = data[i - this.skip]
          })
      }
    }

  }

  //LOCAL SORTING
  sortByString(){

    if(this.sortOrder==true){

      this.arrow = '↑';
      this.cars.sort((a,b)  => b[this.sortParameter].localeCompare(a[this.sortParameter]));
      this.sortOrder = false;

    }else{

      this.arrow = '↓';
      this.cars.sort((a,b)  => a[this.sortParameter].localeCompare(b[this.sortParameter]));
      this.sortOrder = true;
    }
  }

  sortByNumber(){

    if(this.sortOrder==true){

      this.cars.sort((a,b) => a.price - b.price)
      this.arrow = '↑';
      this.sortOrder = false;

    }else{

      this.cars.sort((a,b) => b.price - a.price)
      this.arrow = '↓';
      this.sortOrder = true;
    }
  }

  //SLICE PAGINATION PARAMETERS
  sliceParams() {
    this.skip = (this.pag.pageNo - 1) * this.pag.size;
    this.limit = this.pag.size * this.pag.pageNo;
    if (this.limit > this.collectionSize && this.collectionSize) this.limit = this.collectionSize;

  }

  //GET COLLECTION LENGTH
  getColl(): void {
    this.carService
      .getCars()
      .subscribe(data => { this.collectionSize = data.length; });
  }

  //REFRESH COLLECTION AFTER ADDING
  refreshCars() {
    this.getCars();
    this.getColl();
  }

  //SHOW SEARCH MENU
  showSearch(){
    this.showFilters = !this.showFilters;
  }

  //SEARCH CARS
  searchCars(): void {
    this.searched = true;
    this.carService
      .searchCar(this.searchOptions)
      .subscribe(data => { this.cars = data });
  }

  //RESET SEARCH OPTIONS
  resetOptions(){
    for(let k in this.searchOptions) this.searchOptions[k]='';
  }
  
}

