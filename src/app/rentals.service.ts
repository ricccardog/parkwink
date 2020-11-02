import { Injectable } from '@angular/core';
import { Rentals } from './rentals';
import { RENTALS } from './mock-rentals';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

  constructor() { }

    getRentals() : Observable<Rentals[]> {
      return of(RENTALS)
   }

  }
