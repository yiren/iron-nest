import { EntityRepository, Like, Repository } from 'typeorm';
import { Inject, Injectable, Logger, OnModuleInit, forwardRef } from '@nestjs/common';

import { Department } from 'shared/entity/Department';
import { DepartmentService } from 'shared/services/deps.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleRef } from '@nestjs/core';
import { Role } from 'shared/entity/Role';
import { RolesService } from 'shared/services/role.service';
import { User } from '../entity/User';
import { UserDTO } from '../DTOs/userDTO';

@EntityRepository(User)
export class UsersRepository extends Repository<User>   {
    
    constructor() {
        super();
        
    }

    async queryActiveUsersByDepName(depName: string){
        return await this.createQueryBuilder('user')
                         .leftJoinAndSelect('user.dep', 'dep', 'dep.depName = :name', { name: Like(depName.toLowerCase())})
                         .where('user.isActive = :isActive', {isActive:true})
                         .orderBy('username', 'DESC')
                         .getMany();
    }
}