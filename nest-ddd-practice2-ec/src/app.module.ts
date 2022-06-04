import { Module } from '@nestjs/common';
import { FindAllUsersUseCase } from './application/use-case/find-all-users.usecase';
import { PushMessageUseCase } from './application/use-case/push-message.usecase';
import { RepositoryModule } from './infrastructure/repository/repository.module';
import { UserController } from './presentation/controller/user/user.controller';
import { LineService } from './services/line/line.service';

@Module({
  imports: [RepositoryModule],
  controllers: [UserController],
  providers: [FindAllUsersUseCase, PushMessageUseCase, LineService],
})
export class AppModule {}
