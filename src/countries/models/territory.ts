import { Region } from "./region";

export class Territory extends Region {
  private administrator: string;

  constructor(name: string, population: number, administrator: string) {
    super(name, population);
    this.administrator = administrator;
  }

  public getAdministrator(): string {
    return this.administrator;
  }

  public getDescription(): string {
    return `Territory of ${this.name} with population ${this.population}, administered by ${this.administrator}`;
  }
}