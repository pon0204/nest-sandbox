export class User {
  readonly id: number;
  public name: string;
  public displayName: string;
  public lineId: string;
  public stripeCustomerId: string;

  constructor(
    id: number,
    name: string,
    displayName: string,
    lineId: string,
    stripeCustomerId: string,
  ) {
    (this.id = id),
      (this.name = name),
      (this.displayName = displayName),
      (this.lineId = lineId),
      (this.stripeCustomerId = stripeCustomerId);
  }
}
