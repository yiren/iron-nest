import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { DepartmentDTO } from 'shared/DTOs/depDTO';
import { DepartmentService } from 'shared/services/deps.service';

@Controller('deps')
export class DepartmentsController {
    constructor(
        private depService: DepartmentService,
    ){}

    @Post('dep')
    @UsePipes(new ValidationPipe({transform: true}))
        addDep(@Body() depDTO: DepartmentDTO){
        return this.depService.addDep(depDTO);
    }
}