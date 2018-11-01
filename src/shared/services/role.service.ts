import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from 'shared/entity/Role';
import { RoleDTO } from 'shared/DTOs/roleDTO';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) // 注入 typeorm repository
        private readonly roleRepo: Repository<Role>,
    ) {}
    
    async addRole(roleDto: RoleDTO){
        const role = new Role();
        role.roleName = roleDto.roleName;
        return await this.roleRepo.save(role);
    }

    async getRoleById(id){
        return await this.roleRepo.findOne(id);
    }

    async getRolesByIds(ids){
        return await this.roleRepo.findByIds(ids);
    }

    async getRoles(){
        return await this.roleRepo.find({relations:['users']});
    }
}