import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import {cors} from 'cors';

@Module({
  imports: [
    SharedModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
   
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer ) {
    consumer
      .apply(LoggerMiddleware, cors) // 要套用哪個Middleware，可以套用多個middleware，以逗點分隔
      .exclude( // 列舉排除的routes
        { path: '/', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.GET },
      )
      .forRoutes(AppController); // 指定哪些routes要套用，可以傳入Controller或是Controller陣列
  }
}
