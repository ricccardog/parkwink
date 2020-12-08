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

  pagination = {
    pageNo : 1,
    size : 4
  }
  collectionSize : number;
  
  searched = false;

  constructor(private rentalsService: RentalsService) { 
  }

  ngOnInit(): void {
   this.getRentals(this.pagination);
   this.getColl();
  }
  //GET
  getRentals(pagination): void {
    this.searched = false;
    this.rentalsService
      .getRentals(this.pagination)
      .subscribe(rentals => { this.rentals = rentals }) 
  }
  // GET COLLECTION LENGTH
  getColl() : void {
    this.rentalsService
        .getRentals()
        .subscribe(data => { this.collectionSize = data.length})
  }
  //REFRESH AFTER ADDING
  refreshRentals() {
    this.getRentals(this.pagination);
    this.getColl();
  }
  //SEARCH
  searchRental(event: RentalFilter){
    this.searched = true;
    this.rentalsService
        .searchRental(event)
        .subscribe(data => { this.rentals = data});
  }
 
  
}


