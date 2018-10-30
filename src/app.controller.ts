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
  userList(){
    return this.appService.getUsers();
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
  
  @Get(':userId')
  getUserById(@Param('userId') id){
    return this.appService.getUserById(id);
  }

  @Put(':userId')
  updateUserById(@Param('userId') id, @Body() userDTO: UserDTO){
    return this.appService.updateUser(id, userDTO);
  }

  @Delete(':userId')
  delete(@Param('userId') id){
    return this.appService.deleteUser(id);
  }
}