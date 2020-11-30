import { Component, OnInit } from '@angular/core';
import { RentalFilter } from '../rentalFilter';
import { Rental } from '../rentals';
import { RentalsService } from '../rentals.service'


@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})

export class RentalsComponent implements OnInit {

  rentals: Rental[] = [];
  sortString = 0;

  RENTALS : Rental[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = this.RENTALS.length;
 
  constructor(private rentalsService: RentalsService) { 
    this.refreshRentals();
  }

  ngOnInit(): void {
   this.getRentals();
  }
  //GET
  getRentals(): void {
  this.rentalsService
      .getRentals()
      .subscribe(rentals => { this.rentals = rentals ; this.RENTALS = rentals}) 
  }
  //SEARCH
  searchRental(event: RentalFilter){
    this.rentalsService
        .searchRental(event)
        .subscribe(data => { this.rentals = data});
  }
  //SORT RENTAL
  sortByCar() {
    this.sortString++ ;
    if(this.sortString % 2 == 0){
      this.rentals = this.rentals.sort((a,b) => { return a.car.model.localeCompare(b.car.model) })
    }else{
      this.rentals = this.rentals.sort((a,b) => { return b.car.model.localeCompare(a.car.model) })
    }
  }
  sortByCustomer() {
    this.sortString++ ;
    if(this.sortString % 2 == 0){
      this.rentals = this.rentals.sort((a,b) => { return a.customer.surname.localeCompare(b.customer.surname)})
    }else{
     this.rentals = this.rentals.sort((a,b) => { return b.customer.surname.localeCompare(a.customer.surname)})
    }
  }
  sortByPrice() {
    this.sortString++ ;
    if(this.sortString % 2 == 0){
      this.rentals = this.rentals.sort((a,b) => { return a.price - b.price})
    }else{
      this.rentals = this.rentals.sort((a,b) => { return b.price - a.price})
    }
  }
  //PAGINATION
  refreshRentals() {
    this.RENTALS = this.rentals
    .map((rental, i ) => ({id: i+1, ...rental}))
    .slice((this.page-1) * this.pageSize, (this.page-1) * this.pageSize + this.pageSize)
  }
}


