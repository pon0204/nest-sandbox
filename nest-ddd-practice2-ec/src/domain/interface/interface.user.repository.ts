import { User } from '../domain-object/entity/User';

export abstract class IUserRepository {
  abstract findAll(): Promise<User[]>;
  abstract findById(id: number): Promise<User[]>;
  abstract findOneById(id: number): Promise<User | undefined>;
  abstract save(user: User): Promise<void>;
}
