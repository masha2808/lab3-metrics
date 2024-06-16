import { Region } from "./region";

export class State extends Region {
  private governor: string;

  constructor(name: string, population: number, governor: string) {
    super(name, population);
    this.governor = governor;
  }

  public getDescription(): string {
    return `State of ${this.name} with population ${this.population}, governed by ${this.governor}`;
  }
}