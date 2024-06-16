export abstract class Location {
  protected name: string;
  protected population: number;

  constructor(name: string, population: number) {
    this.name = name;
    this.population = population;
  }

  public abstract getDescription(): string;

  public getName(): string {
    return this.name;
  }

  public getPopulation(): number {
    return this.population;
  }
}