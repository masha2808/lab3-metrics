export class Government {
  private type: string;
  private leader: string;

  constructor(type: string, leader: string) {
    this.type = type;
    this.leader = leader;
  }

  public getType(): string {
    return this.type;
  }

  public getLeader(): string {
    return this.leader;
  }
}