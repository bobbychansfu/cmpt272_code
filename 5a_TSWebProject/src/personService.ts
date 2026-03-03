/* 
    - adds a person to the list
    - retrieves the list of people
    - sets the list of people (used when loading from storage)

*/

import { Person } from "./person";

export class PersonService {
  private people: Person[] = [];
  private nextId = 1;

  addPerson(name: string): Person {
    const person = new Person(this.nextId++, name);
    this.people.push(person);
    return person;
  }

  getAll(): Person[] {
    return [...this.people]; // a copy to prevent external mutation
  }
}