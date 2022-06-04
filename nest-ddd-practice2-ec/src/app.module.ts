import { Module } from '@nestjs/common';
import { FindAllUsersUseCase } from './application/use-case/find-all-users.usecase';
import { RepositoryModule } from './infrastructure/repository/repository.module';
import { UserController } from './presentation/controller/user.controller';

@Module({
  imports: [RepositoryModule],
  controllers: [UserController],
  providers: [FindAllUsersUseCase],
})
export class AppModule {}
