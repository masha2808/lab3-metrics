import { Location } from "./location";

export class City extends Location {
  constructor(name: string, population: number) {
    super(name, population);
  }

  public getDescription(): string {
    return `City of ${this.name} with population ${this.population}`;
  }
}