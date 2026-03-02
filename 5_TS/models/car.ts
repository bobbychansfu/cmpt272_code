export class Vehicle {
    constructor(public make: string, public model: string, public year: number) {}

    getInfo(): string {
        return `${this.year} ${this.make} ${this.model}`;
    }
}

export class ElectricCar extends Vehicle {
    constructor(make: string, model: string, year: number, public batteryCapacity: number) {
        super(make, model, year);
    }

    getBatteryInfo(): string {
        return `Battery capacity: ${this.batteryCapacity} kWh`;
    }
}

export type CarType = "sedan" | "suv" | "truck";


