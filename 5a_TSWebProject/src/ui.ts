/* UI Responsible for
    - rendering the list of people
    - handling user input for adding new people
    - coordinating with PersonService and StorageService

*/

import { Person } from "./person";
import { PersonService } from "./personService";
import { StorageService } from "./storageService";

export class UI {
  private listElement = document.getElementById("personList") as HTMLUListElement;
  private inputElement = document.getElementById("nameInput") as HTMLInputElement;
  private addButton = document.getElementById("addBtn") as HTMLButtonElement;
  private personService;
  private storageService;

  constructor(personService: PersonService, storageService: StorageService) {
    this.personService = personService;
    this.storageService = storageService;
  }

  async init(): Promise<void> {
    const data = await this.storageService.load();
    const parsed = await JSON.parse(data) as Person[];
    parsed.forEach(
        p => this.personService.addPerson(p.name)
    );
    // this.personService.setPeople(people);
    this.render();
    this.bindEvents();
  }

  private bindEvents(): void {
    this.addButton.addEventListener("click", async () => {
      const name = this.inputElement.value.trim();
      if (!name) return;

      this.personService.addPerson(name);
      this.inputElement.value = "";

      await this.storageService.save(this.personService.getAll());
      this.render();
    });
  }

  private render(): void {
    this.listElement.innerHTML = "";

    const people = this.personService.getAll();

    for (const person of people) {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `${person.id} - ${person.name}`;
      this.listElement.appendChild(li);
    }
  }
}