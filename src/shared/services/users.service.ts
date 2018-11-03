import { Injectable, Logger } from '@nestjs/common';
import { Like, Repository } from 'typeorm';

import { DepartmentService } from './deps.service';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'shared/services/role.service';
import { User } from 'shared/entity/User';
import { UserDTO } from 'shared/DTOs/userDTO';
import { UserQueryDTO } from '../DTOs/userQueryDTO';

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
        // 載入roles導覽屬性
        // 設定eager=true後要把dep拿掉，重複載入SQL語法錯誤
        return await this.userRepo.find({relations: ['roles']});
      }
      async getUserById(id): Promise<User>{
        // 載入roles導覽屬性
        // 設定eager=true後要把dep拿掉，重複載入SQL語法錯誤
        return await this.userRepo.findOne(id, {relations: ['roles']}); 
        // return await this.userRepo.findOneOrFail(id); // 以id搜尋，沒找到會丟出例外
      }

      
      async getUsersByRoleId(roleId){
          
      }
      
      async getUsersByDepName(query: UserQueryDTO){
     
        return await this.userRepo
            .createQueryBuilder('u') // 指定User別名為u
            // 指定join user的roles關聯屬性，並指定別名為r，並設定搜尋條件
            .leftJoinAndSelect('u.roles', 'r')
            // 指定join user的dep關聯屬性，並指定別名為d，並設定搜尋條件
            .leftJoinAndSelect('u.dep', 'd')
            // 設定條件
            .where('u.isActive = :isActive', {isActive: true})
            .andWhere('d.depName like :name', { name: `%${query.name.toLowerCase()}%`})
            // 以username降冪排序
            .orderBy('username', 'DESC')
            // 回傳多筆資料
            .getMany();
            // 回傳上面API所組出來的Raw SQLㄝ, debug用
            // .getSql();

     }

     async getUsersByRoleName(query: UserQueryDTO){
          return await this.userRepo
            .createQueryBuilder('u')
            .leftJoinAndSelect('u.roles', 'r')
            .leftJoinAndSelect('u.dep', 'd')
            // 以roleName作為篩選條件
            .where('r.roleName like :name', { name: `%${query.name.toLowerCase()}%`})
            .orderBy('u.username', 'ASC')
            // Orderby也可以串聯
            .addOrderBy('u.id', 'DESC')
            // 跳過筆數，第一頁就為0，第二頁跳過pageSize筆
            .skip((query.page - 1) * query.pageSize)
            .take(query.pageSize) // 取pageSize筆數
            .select([
              'u',
              'd.id',
              'd.depName',
              'r', // 選alias就會包含id了，只是所有欄位都會選取
              // 'r.id',
              //'r.roleName',
            ])
            .addSelect('u.password') // select 隱藏欄位
            // debug
            // .getSql();
            .getManyAndCount(); //回傳record 並 count筆數

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