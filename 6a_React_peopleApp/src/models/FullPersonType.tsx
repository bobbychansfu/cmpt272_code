import type { Person } from "./PersonType";

export type FullPersonType = Person & {
  email: string;
  phone: string;
  age: number;
  country: string;
  seed: string;
};