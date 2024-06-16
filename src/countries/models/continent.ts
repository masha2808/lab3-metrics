import { Country } from "./country";
import { Place } from "./place";

export class Continent extends Place {
  private countries: Country[] = [];

  addCountry(country: Country): void {
    this.countries.push(country);
  }

  getCountries(): Country[] {
    return this.countries;
  }

  private updateContinent(): void {
    console.log("Update continent");
  }
}