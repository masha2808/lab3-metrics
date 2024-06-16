import { Language } from "./language";
import { Region } from "./region";
import { Place } from "./place";
import { Government } from "./government";

export class Country extends Place {
  private regions: Region[] = [];

  constructor(name: string, private capital: string, private population: number, private area: number, private government: Government, private languages: Language[]) {
    super(name);
  }

  getCapital(): string {
    return this.capital;
  }

  getPopulation(): number {
    return this.population;
  }

  getArea(): number {
    return this.area;
  }

  getGovernment(): Government {
    return this.government;
  }

  getOfficialLanguages(): Language[] {
    return this.languages;
  }

  addRegion(region: Region): void {
    this.regions.push(region);
  }

  getRegions(): Region[] {
    return this.regions;
  }
}