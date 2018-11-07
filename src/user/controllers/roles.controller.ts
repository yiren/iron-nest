import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';

import { RoleDTO } from 'shared/DTOs/roleDTO';
import { RolesService } from 'shared/services/role.service';

@Controller('roles')
export class RolesController {
    constructor(
        private rolesService: RolesService,
    ){}

    @Get()
        getRoles(){
        return this.rolesService.getRoles();
    }

    @Get(':roleId')
        getRoleById(@Param('roleId') id){
        return this.rolesService.getRoleById(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({transform: true}))
        addRole(@Body() roleDTO: RoleDTO){
        return this.rolesService.addRole(roleDTO);
    }

    @Put(':roleId')
    @UsePipes(new ValidationPipe({transform: true}))
        updateRole(@Param('roleId') roleId, @Body() roleDTO: RoleDTO){
        return this.rolesService.updateRole(roleId, roleDTO);
    }
}