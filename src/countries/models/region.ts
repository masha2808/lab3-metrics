import { Location } from "./location";
import { City } from "./city";

export class Region extends Location {
  private cities: City[];

  constructor(name: string, population: number) {
    super(name, population);
    this.cities = [];
  }

  public addCity(city: City): void {
    this.cities.push(city);
  }

  public getCities(): City[] {
    return this.cities;
  }

  public getDescription(): string {
    return `Region of ${this.name} with population ${this.population}`;
  }

  private updateRegion(city: City): void {
    console.log("Update region");
  }
}