import { Injectable, Logger } from '@nestjs/common';

import { DepartmentService } from './deps.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesService } from 'shared/services/role.service';
import { User } from 'shared/entity/User';
import { UserDTO } from 'shared/DTOs/userDTO';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) // 注入 typeorm repository
        private readonly userRepo: Repository<User>,
        private depService: DepartmentService,
        private roleService: RolesService,
      ){}
      async addUser(data: UserDTO): Promise<User>{
        const user = new User();
        user.username = data.username;
        user.email = data.email;
        //user.depId  = data.depId; 不能只指定id，必須傳入物件
        user.dep = await this.depService.getDepById(data.depId);
        // 先要取得role物件陣列，再指給user物件下的roles，save時才會儲存關聯
        user.roles = await this.roleService.getRolesByIds(data.roleIds);
        return await this.userRepo.save(user); // 新增一筆user資料
      }
      async getUsers(): Promise<User[]>{
        return await this.userRepo.find({relations: ['dep', 'roles']}); // 載入dep及roles導覽屬性
      }
      async getUserById(id): Promise<User>{
        return await this.userRepo.findOne(id, {relations: ['dep', 'roles']}); // 載入dep及roles導覽屬性
        // return await this.userRepo.findOneOrFail(id); // 以id搜尋，沒找到會丟出例外
      }
      async updateUser(id, data: UserDTO){
        const user = new User();
        user.username = data.username;
        user.email = data.email;
        user.dep = await this.depService.getDepById(data.depId);
        user.roles = await this.roleService.getRolesByIds(data.roleIds);
        return await this.userRepo.update(id, user); // 用data裡的值更新到資料庫
      }
      async deleteUser(id){
        return this.userRepo.delete(id); // delete只需要傳入id
      }
}