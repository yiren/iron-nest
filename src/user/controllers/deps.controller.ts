import { Body, Controller, Get, Post, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';

import { DepartmentDTO } from 'shared/DTOs/depDTO';
import { DepartmentService } from 'shared/services/deps.service';
import { ApiUseTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('deps')
@Controller('deps')
export class DepartmentsController {
    constructor(
        private depService: DepartmentService,
    ){}
    @ApiCreatedResponse({description:'department created'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Post('dep')
    @UsePipes(new ValidationPipe({transform: true}))
        addDep(@Body() depDTO: DepartmentDTO){
        return this.depService.addDep(depDTO);
    }
}