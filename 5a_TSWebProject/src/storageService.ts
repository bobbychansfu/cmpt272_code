/* StorageService:
 - saves the list of people to localStorage
 - loads the list of people from localStorage
*/

import { Person } from "./person";

const STORAGE_KEY = "persons";

export class StorageService {
  save(persons: Person[]): Promise<void> {
    return new Promise((resolve) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persons));
      resolve();
    });
  }

  load(): Promise<string> {
    return new Promise((resolve) => {
      const data = localStorage.getItem(STORAGE_KEY);
      resolve(data ? data : "[]");
    });
  }
}
