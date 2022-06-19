import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FindAllUsersUseCase } from './application/use-case/find-all-users.usecase';
import { PushMessageUseCase } from './application/use-case/push-message.usecase';
import { RepositoryModule } from './infrastructure/repository/repository.module';
import { UserController } from './presentation/controller/user/user.controller';
import { LineService } from './adapters/line/line.service';
import { validate } from './config/environments/env-validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validate,
    }),
    RepositoryModule,
  ],
  controllers: [UserController],
  providers: [FindAllUsersUseCase, PushMessageUseCase, LineService],
})
export class AppModule {}
