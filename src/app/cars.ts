export interface Car {
    id: number;
    name: string;
    model: string;
    creationDate: Date ;
    price: number;
}

export class extraCar implements Car {
    id: number;
    name: string;
    model: string;
    creationDate: Date;
    price: number
}