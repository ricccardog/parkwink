export interface Car {
    id: number;
    name: string;
    model: string;
    creationDate: Date ;
    price: number;
}

export class Car {

    constructor(
        id: number,
        name: string,
        model: string,
        creationDate: Date ,
        price: number
    ) {}
}