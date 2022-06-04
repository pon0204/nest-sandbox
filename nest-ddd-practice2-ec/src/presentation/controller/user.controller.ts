import { Controller, Get } from '@nestjs/common';
import { FindAllUsersUseCase } from 'src/application/use-case/find-all-users.usecase';
import { User } from 'src/domain/domain-object/entity/User';

@Controller('users')
export class UserController {
  constructor(private readonly findAllUseCase: FindAllUsersUseCase) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.findAllUseCase.handle();
  }
}
