import { Body, Controller, Delete, Get, Param, Post, Put, Query, ReflectMetadata, UnauthorizedException, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { HttpExceptionFilter } from './shared/filters/httpexception.filter';
import { TransformResInterceptor } from './shared/interceptors/transformRes.interceptor';
import { UserDTO } from './shared/DTOs/userDTO';
import { UserDTOValidationPipe } from './shared/pipes/userDTOValidation.pipe';

@Controller()
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard)
//@UseInterceptors(TransformResInterceptor)
export class AppController {
  constructor(private appService: AppService){
    // this.redisClient = redis.createClient(6379, 'redis-server');
    // this.redisClient.set('counter', '0');
  }
  
  @Get()
  sayHello(){
    return this.appService.sayHello();
  }

  @Get('users')
  queryedList(@Query() query){
    throw new UnauthorizedException('請登入');
    return query;
  }

  @Post()
  @UsePipes(UserDTOValidationPipe)
  @ReflectMetadata('roles', ['admin', 'superuser'])
  create(@Body() userDTO: UserDTO){
    //throw new HttpException('糟糕!您的要求有問題，請洽系統管理員', HttpStatus.BAD_REQUEST);
    return this.appService.addUser(userDTO);
  }

  inMemoryUsers = [
    {
      id: 2,
      username: '測試2',
      email: 'test2@test.com',
    },
    {
      id: 3,
      username: '測試3',
      email: 'test3@test.com',
    },
  ];
  
  @Get(':userId')
  getUserById(@Param('userId') id){
    const userFromMemory = this.inMemoryUsers.find((user) => user.id === parseInt(id, 10));
    const resUser = new UserDTO();
    resUser.username = userFromMemory.username;
    resUser.email = userFromMemory.email;
    return resUser;
  }

  @Put(':userId')
  updateNicknameByEmail(@Param('userId') id, @Body() userDTO: UserDTO){
    const userToUpdate = this.inMemoryUsers.find((user) => user.id === parseInt(id, 10));
    userToUpdate.email = userDTO.email;
    userToUpdate.username = userDTO.username;
    const resUser = new UserDTO();
    resUser.username = userToUpdate.username;
    resUser.email = userToUpdate.email;
    return resUser;
  }

  @Delete()
  delete(){
    return '刪除資料';
  }
}