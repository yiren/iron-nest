import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { HttpExceptionFilter } from './shared/filters/httpexception.filter';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { SharedModule } from './shared/shared.module';
import { TransformResInterceptor } from './shared/interceptors/transformRes.interceptor';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './shared/entity/User';
import {cors} from 'cors';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthGuard,
    HttpExceptionFilter,
    TransformResInterceptor,
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer ) {
    consumer
      .apply(LoggerMiddleware, cors) //要套用哪個Middleware，可以套用多個middleware，以逗點分隔
      .exclude( // 列舉排除的routes
        { path: '/', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.GET}
      )
      .forRoutes(AppController); // 指定哪些routes要套用，可以傳入Controller或是Controller陣列
  }

}
