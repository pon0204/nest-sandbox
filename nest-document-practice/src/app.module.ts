import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [CatsModule],
})
// middlewareをconfigure関数でSetする。
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude( // ミドルウェアを除外するメソッドを決める
      //   { path: 'cats', method: RequestMethod.GET },
      //   { path: 'cats', method: RequestMethod.POST },
      //   'cats/(.*)',
      // )
      .forRoutes(CatsController);
    // .forRoutes({ path: 'cats', method: RequestMethod.GET }); // catsパスのGETのみ適用。
    // .forRoutes('cats');
    // .forRoutes({ path: 'ab*cd', method: RequestMethod.ALL }); // ワイルドカード
  }
}
// export class AppModule  {}
