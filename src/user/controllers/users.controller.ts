import { Body, Controller, Delete, Get, Param, Post, Put, Query, ReflectMetadata, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from 'shared/DTOs/userDTO';
import { UserDTOValidationPipe } from 'shared/pipes/userDTOValidation.pipe';
import { UserQueryDTO } from 'shared/DTOs/userQueryDTO';
import { UsersService } from 'shared/services/users.service';
import { ApiUseTags, ApiBearerAuth, ApiOkResponse, ApiForbiddenResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';

// UseGuards()傳入@nest/passport下的AuthGuard
// strategy
@ApiUseTags('users')
@ApiBearerAuth()
@ApiForbiddenResponse({description:'Unauthorized'})
@UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ){}

  @ApiOkResponse({description:'Return Users Array'})
  @Get()
  @MessagePattern({accountData:'users'})
  userList(){
    return this.usersService.getUsers();
  }



  @Get('query/user')
  queryByDepName(@Query() query: UserQueryDTO){
    //return this.usersService.getUsersByDepName(query);
    return this.usersService.getUsersByRoleName(query);
  }

  @Post()
  @ApiCreatedResponse({description:'User Created'})
  @ApiInternalServerErrorResponse({description:'Invalid Input'})
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

  // @Put(':userId/:depId')
  // updateUserDepById(@Param('userId') userId, @Param('depId') depId){
  //   return this.usersService.updateUserDepById(userId, depId);
  // }

  @Put(':userId')
  updateUserById(@Param('userId') id, @Body() userDTO: UserDTO){
    return this.usersService.updateUserById(id, userDTO);
    // return this.usersService.updateUserRolesByIds(id, userDTO);
  }

  @Delete(':userId')
  delete(@Param('userId') id){
    return this.usersService.deleteUser(id);
  }
}