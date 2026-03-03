/* Main.ts
  - initializes the application
  - creates instances of PersonService, StorageService, and UI
  - starts the UI
*/

import { PersonService } from "./personService";
import { StorageService } from "./storageService";
import { UI } from "./ui";

const personService = new PersonService();
const storageService = new StorageService();

const app = new UI(personService, storageService);

app.init();