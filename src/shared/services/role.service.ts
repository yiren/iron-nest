import { Injectable, Logger } from '@nestjs/common';

import { EntityDate } from 'shared/entity/EntityDate';
import { InjectRepository } from '@nestjs/typeorm';
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
        role.entityDate = new EntityDate();
        return await this.roleRepo.save(role);
    }

    async getRoleById(id){
        // return await this.roleRepo.findOne(id,{ select:[
        //     'id',
        //     'roleName',
        //     'entityDate', // error
            
        // ]});
        return await this.roleRepo.find({id})
                         ;
    }

    async getRolesByIds(ids){
        return await this.roleRepo.findByIds(ids);
    }

    async getRoles(){
        return await this.roleRepo.find({relations:['users']});
    }

    async updateRole(roleId, roleDTO: RoleDTO){
        // 
        // return await this.roleRepo.update(roleId, roleDTO);
        const role = await this.roleRepo.findOne(roleId);
        role.roleName = roleDTO.roleName;
        return await this.roleRepo.save(role);
    }
}