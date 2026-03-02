/**
 * TypeScript  Demo - Part 2
 * ------------------------
 * Covers:
 * - Interfaces vs Classes
 * - Inheritance & Polymorphism
 * - Abstract Classes
 * - Access Modifiers
 * - Getters / Setters
 * - Generics
 * - Import / Export
 */

// --- 1. Interfaces + Classes + Inheritance -----

interface Thing {
  name: string;
  age: number;
}

interface Living {
  speak(): void;
}

class Person implements Thing, Living {
  static totalPeople = 0;

  public name: string;
  public age: number;
  protected isAlive: boolean = true;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    Person.totalPeople++;
  }

  speak(): void {
    console.log(`Hello, my name is ${this.name} and I am ${this.age}.`);
  }

  static describeClass(): void {
    console.log("Person is a blueprint for people.");
  }
}

class Student extends Person {
  constructor(
    name: string,
    age: number,
    public studentId: string,
  ) {
    super(name, age);
  }

  override speak(): void {
    console.log(`Hi, I'm ${this.name}, student ID: ${this.studentId}`);
  }

  isStudentAlive(): boolean {
    return this.isAlive; // protected property accessible in subclass
  }
}

class Teacher extends Person {
  constructor(
    name: string,
    age: number,
    private subject: string,
  ) {
    super(name, age);
  }

  override speak(): void {
    console.log(`Hello, I'm ${this.name}, and I teach ${this.subject}.`);
  }
}

// Polymorphism
function greet(living: Living): void {
  living.speak();
}

function inspectPerson(person: Person): void {
  person.speak();

  if (person instanceof Student) {
    console.log("Student ID:", person.studentId);
  } else if (person instanceof Teacher) {
    console.log("This person is a teacher.");
  }
}

const alice = new Person("Alice", 30);
const bob = new Student("Bob", 20, "S123");
const drSmith = new Teacher("Dr. Smith", 45, "Math");

greet(alice);
greet(bob);
greet(drSmith);

inspectPerson(bob);
inspectPerson(drSmith);

// ----- 2. Abstract Classes -----

abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Ruff!");
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log("Meow!");
  }

  override move(): void {
    console.log("The cat gracefully moves...");
  }
}

const dog = new Dog();
const cat = new Cat();

dog.makeSound();
dog.move();

cat.makeSound();
cat.move();

// ------ 3. Access Modifiers + Getters / Setters

class Car {
  private _speed = 0;

  get speed(): number {
    return this._speed;
  }

  set speed(value: number) {
    if (value < 0) {
      console.log("Speed cannot be negative.");
      return;
    }
    this._speed = value;
  }
}

const myCar = new Car();
myCar.speed = 50;
console.log("Car speed:", myCar.speed);

// ---- 4. Generics ---------

function identity<T>(value: T): T {
  return value;
}

const numResult = identity<number>(42);
const strResult = identity("Hello");

console.log(numResult.toFixed(2));
console.log(strResult.toUpperCase());

interface Box<T> {
  contents: T;
}

const stringBox: Box<string> = { contents: "TypeScript" };
const numberBox: Box<number> = { contents: 123 };

console.log(stringBox.contents.toUpperCase());

// A more realistic generic example with constraints

interface Entity {
  id: number;
}

class Repository<T extends Entity> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return [...this.items];
  }
}

interface PersonEntity extends Entity {
  name: string;
}

interface ProductEntity extends Entity {
  price: number;
}

const personRepo = new Repository<PersonEntity>();
const productRepo = new Repository<ProductEntity>();

personRepo.add({ id: 1, name: "Bob" });
productRepo.add({ id: 1, price: 9.99 });

console.log(personRepo.getAll());
console.log(productRepo.getAll());

// ----- 5. Import / Export -----

import { Vehicle, ElectricCar } from "./models/car";
import type { CarType } from "./models/car";

class CarShowroom {
  private cars: Vehicle[] = [];
  private type: CarType;

  constructor(type: CarType) {
    this.type = type;
  }

  addCar(car: Vehicle) {
    this.cars.push(car);
  }

  showCars() {
    console.log(`Welcome to the ${this.type} showroom!`);
    this.cars.forEach((car) => {
      console.log(car.getInfo());
      if (car instanceof ElectricCar) {
        console.log(car.getBatteryInfo());
      }
    });
  }
}

const myVehicle = new Vehicle("Toyota", "Corolla", 2020);
const myElectricCar = new ElectricCar("Tesla", "Model S", 2021, 100);
const showroom = new CarShowroom("sedan");
showroom.addCar(myVehicle);
showroom.addCar(myElectricCar);
showroom.showCars();
