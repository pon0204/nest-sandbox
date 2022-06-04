import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/domain-object/entity/user';
import { IUserRepository } from 'src/domain/interface/interface.user.repository';
import { Repository } from 'typeorm';
import { User as UserTypeOrmEntity } from '../entity/user.entity';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userTypeOrmRepository: Repository<UserTypeOrmEntity>,
  ) {}
  async findAll(): Promise<User[]> {
    const users = await this.userTypeOrmRepository.find();
    return users.map(this.makeEntity);
  }

  async findById(id: number): Promise<User[]> {
    const users = await this.userTypeOrmRepository.find({ id });
    return users.map(this.makeEntity);
  }

  async findOneById(id: number): Promise<User | undefined> {
    const user = await this.userTypeOrmRepository.findOne(id);
    if (!user) return undefined;
    return this.makeEntity(user);
  }

  async save(user: User): Promise<void> {
    await this.userTypeOrmRepository.save({
      name: user.name,
      displayName: user.displayName,
      lineId: user.lineId,
      stripeCustomerId: user.stripeCustomerId,
    });
  }

  makeEntity(infraUser: User): User {
    return new User(
      infraUser.id,
      infraUser.name,
      infraUser.displayName,
      infraUser.lineId,
      infraUser.stripeCustomerId,
    );
  }
}
