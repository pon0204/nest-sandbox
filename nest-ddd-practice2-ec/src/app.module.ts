import { Module } from '@nestjs/common';
import { RepositoryModule } from './infrastructure/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
