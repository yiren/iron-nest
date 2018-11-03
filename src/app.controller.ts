import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, ReflectMetadata, UnauthorizedException, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { DepartmentDTO } from './shared/DTOs/depDTO';
import { DepartmentService } from './shared/services/deps.service';
import { HttpExceptionFilter } from './shared/filters/httpexception.filter';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDTO } from 'shared/DTOs/roleDTO';
import { RolesService } from './shared/services/role.service';
import { TransformResInterceptor } from './shared/interceptors/transformRes.interceptor';
import { UserDTO } from './shared/DTOs/userDTO';
import { UserDTOValidationPipe } from './shared/pipes/userDTOValidation.pipe';
import { UserQueryDTO } from './shared/DTOs/userQueryDTO';
import { UsersRepository } from './shared/repository/users.repository';
import { UsersService } from 'shared/services/users.service';

@Controller()
//@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard)
//@UseInterceptors(TransformResInterceptor)
export class AppController {
  constructor(
    private usersService: UsersService,
    private depService: DepartmentService,
    private roleService: RolesService,
    @InjectRepository(UsersRepository)
    private userRepo: UsersRepository,
    ){
    // this.redisClient = redis.createClient(6379, 'redis-server');
    // this.redisClient.set('counter', '0');
  }
  
  @Get()
  userList(){
    return this.usersService.getUsers();
  }

  @Get('users')
  queryedList(@Query() query){
    throw new UnauthorizedException('請登入');
    return query;
  }
  
  @Get('query/user')
  queryByDepName(@Query() query: UserQueryDTO){
    //return this.usersService.getUsersByDepName(query);
    return this.usersService.getUsersByRoleName(query);
  }

  @Post()
  @UsePipes(UserDTOValidationPipe)
  @ReflectMetadata('roles', ['admin', 'superuser'])
  create(@Body() userDTO: UserDTO){
    //throw new HttpException('糟糕!您的要求有問題，請洽系統管理員', HttpStatus.BAD_REQUEST);
    return this.usersService.addUser(userDTO);
    //return this.userRepo.createAndSave(userDTO); not work
  }
  
  @Get(':userId')
  getUserById(@Param('userId') id){
    return this.usersService.getUserById(id);
  }

  @Put(':userId')
  updateUserById(@Param('userId') id, @Body() userDTO: UserDTO){
    return this.usersService.updateUser(id, userDTO);
  }

  @Delete(':userId')
  delete(@Param('userId') id){
    return this.usersService.deleteUser(id);
  }


  @Post('dep')
  @UsePipes(new ValidationPipe({transform:true}))
  addDep(@Body() depDTO: DepartmentDTO){
    return this.depService.addDep(depDTO);
  }
  
  @Get('role/list')
  getRoles(){
    return this.roleService.getRoles();
  }

  @Get('role/:roleId')
  getRoleById(@Param('roleId') id){
    return this.roleService.getRoleById(id);
  }

  @Post('role')
  @UsePipes(new ValidationPipe({transform:true}))
  addRole(@Body() roleDTO: RoleDTO){
    return this.roleService.addRole(roleDTO);
  }
}