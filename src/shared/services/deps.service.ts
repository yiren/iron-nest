import { Department } from '../entity/Department';
import { DepartmentDTO } from '../DTOs/depDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
    async getDeps() {
        return await this.depRepo.find();
    }
    constructor(
        @InjectRepository(Department) // 注入 typeorm repository
        private readonly depRepo: Repository<Department>,
    ) {}
    
    async addDep(depDto: DepartmentDTO){
        const dep = new Department();
        dep.depName = depDto.depName;
        return await this.depRepo.save(dep);
    }

    async getDepById(id){
        return await this.depRepo.findOne(id);
    }
}