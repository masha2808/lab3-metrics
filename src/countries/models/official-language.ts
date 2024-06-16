import { Language } from "./language";

export class OfficialLanguage extends Language {
  private speakers: number;

  constructor(name: string, speakers: number) {
    super(name);
    this.speakers = speakers;
  }

  public getSpeakers(): number {
    return this.speakers;
  }

  public setSpeakers(speakers: number): void {
    this.speakers = speakers;
  }

  public getLanguageName(): string {
    return this.name;
  }
}