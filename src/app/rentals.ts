import { Car } from './cars';
import { Customer } from './customers';

export interface Rentals {
    id: number;
    car: Car;
    user: Customer;
    fromDate: Date;
    toDate: Date;
    price: number;
}

