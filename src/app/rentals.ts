import { Car } from './cars';
import { Customer } from './customers';

export interface Rental {
    
    id: number;
    car: Car;
    customer: Customer;
    startDate: Date;
    endDate: Date;
    price: number;

}

