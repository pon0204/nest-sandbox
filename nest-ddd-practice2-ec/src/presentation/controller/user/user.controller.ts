import { Message } from '@line/bot-sdk';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FindAllUsersUseCase } from 'src/application/use-case/find-all-users.usecase';
import { PushMessageUseCase } from 'src/application/use-case/push-message.usecase';
import { User } from 'src/domain/domain-object/entity/User';

@Controller('users')
export class UserController {
  constructor(
    private readonly findAllUseCase: FindAllUsersUseCase,
    private readonly pushMessageUseCase: PushMessageUseCase,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.findAllUseCase.handle();
  }

  @Post('push/:id')
  // @UsePipes(new ValidationPipe({ transform: true }))
  async pushMessage(
    @Param('id') id: number,
    @Body() message: Message,
  ): Promise<void> {
    return this.pushMessageUseCase.handle({ id, message });
  }
}
