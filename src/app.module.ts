import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Department } from './shared/entity/Department';
import { DepartmentService } from 'shared/services/deps.service';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { RolesService } from 'shared/services/role.service';
import { SharedModule } from './shared/shared.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './shared/entity/User';
import { UsersRepository } from 'shared/repository/users.repository';
import { UsersService } from 'shared/services/users.service';
import {cors} from 'cors';
import { userEntities } from 'shared/entity';

@Module({
  imports: [
    
    SharedModule, // import shared module
    TypeOrmModule.forFeature([...userEntities, UsersRepository]), // forFeature告訴nest.js在typeorm要存取相關的entity
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UsersService,
    DepartmentService,
    RolesService,
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
