/* Domain logic
  - Person class with id and name
*/

import type { PersonData } from "./models";

export class Person implements PersonData {
  public id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  // rename: unused for now, but could be useful for future features
  rename(newName: string): void {  
    if (!newName.trim()) {
      throw new Error("Name cannot be empty");
    }
    this.name = newName;
  }
}