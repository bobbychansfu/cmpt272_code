// PART 1 — TypeScript Demo File

// --- Basic Types --- //

let age: number = 20;
let username: string = "Alice";
let isAdmin: boolean = false;

console.log(age, username, isAdmin);

// --- Type Inference --- //

let score = 95;       // inferred as number
// score = "high";    // Type error

console.log("Score:", score);

// -- Symbols --- // 

// Without Symbol — collision problem
const user3: any = {
  name: "Alice"
};
// internal code
user3.id = 123;
// App code (oops — collision!)
user3.id = 456;

console.log("User3:", user3);


// Fix with Symbol — unique property key
const INTERNAL_ID = Symbol("internalId");
const user2: any = {
  name: "Alice"
};
// No collision
user2[INTERNAL_ID] = 123;
user2["internalId"] = 456; // different property

console.log("User2:", user2);

// --- Arrays --- // 

let scores: number[] = [90, 85, 100];
// scores.push("hello"); // Type error

console.log("Scores:", scores);

// --- Object Types --- //

let userObj: {
  name: string;
  email: string;
} = {
  name: "Bob",
  email: "bob@sfu.ca"
};

console.log("User:", userObj);

// --- functions --- //

function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;
console.log("Add:", add(2, 3));
console.log("Multiply:", multiply(2, 3));

// --- Interfaces --- //

interface Person {
  id: number;
  name: string;
  email?: string; // optional property
}

function printPerson(p: Person): void {
  console.log(`Person: ${p.name} (ID: ${p.id})`);
}

const p1: Person = {
  id: 1,
  name: "Charlie"
};

printPerson(p1);

// --- Enums --- //

enum Role {
  Admin,
  User,
  Guest
}

const currentRole: Role = Role.Admin;

if (currentRole === Role.Admin) {
  console.log("Admin access granted");
}
