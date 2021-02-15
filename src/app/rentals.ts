import { Car } from './cars';
import { Customer } from './customers';

export interface Rental {
    
    id: number;
    car_id: Car;
    customer_id: Customer;
    startDate: Date;
    endDate: Date;
    price: number;

}

