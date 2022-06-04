import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  displayName: string;

  @Column()
  lineId: string;

  @Column()
  stripeCustomerId: string;

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
