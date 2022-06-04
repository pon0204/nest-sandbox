import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/domain-object/entity/User';
import { IUserRepository } from 'src/domain/interface/interface.user.repository';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
