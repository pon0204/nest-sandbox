import { Message } from '@line/bot-sdk';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from 'src/domain/interface/interface.user.repository';
import { LineService } from 'src/adapters/line/line.service';

@Injectable()
export class PushMessageUseCase {
  constructor(
    private readonly lineService: LineService,
    private readonly userRepository: IUserRepository,
  ) {}

  async handle({
    id,
    message,
  }: {
    id: number;
    message: Message;
  }): Promise<void> {
    const user = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`not found user:${id}`);
    if (!user?.lineId) throw new BadRequestException();

    return this.lineService.pushMessage({ userId: user.lineId, message });
  }
}
