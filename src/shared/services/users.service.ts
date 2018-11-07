import { Injectable, Logger } from '@nestjs/common';

import { DepartmentService } from './deps.service';
import { EntityDate } from 'shared/entity/EntityDate';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { IsEmail } from 'class-validator';
import { RolesService } from 'shared/services/role.service';
import { User } from 'shared/entity/User';
import { UserDTO } from 'shared/DTOs/userDTO';
import { UserQueryDTO } from '../DTOs/userQueryDTO';

@Injectable()
export class UsersService {
    constructor(
        //@InjectRepository(User) // 注入 typeorm repository
        //private readonly userRepo: Repository<User>,

        // 注入EntityManager可以指定Connection
        // 會用default connection，多個connection要參考nestjs官網
        @InjectEntityManager()
        private readonly em: EntityManager,
        private depService: DepartmentService, // 
        private roleService: RolesService, //
      ){}
      async addUser(data: UserDTO): Promise<User>{
        const user = new User();

        user.username = data.username;
        user.email = data.email;
        user.entityDate = new EntityDate();
        // // user.depId  = data.depId; 不能只指定id，必須傳入物件
        // user.dep = await this.depService.getDepById(data.depId);
        // // 先要取得role物件陣列，再指給user物件下的roles，save時才會儲存關聯
        // user.roles = await this.roleService.getRolesByIds(data.roleIds);
        // return await this.userRepo.save(user); // 新增一筆user資料
        let userId;
        await this.em.createQueryBuilder()
                  .insert() // 不接受任何引數
                  .into(User) // 必須execute才會產生SQL送到DB
                  .values(user) // 先更新關聯以外的欄位
                  .execute()
                  .then(result => {
                    Logger.log(result); // 到console看回傳的格式
                    
                    userId = result.identifiers[0].id; // 取得新增後回傳的id
                    // 以下更新關聯資料
                    this.em.createQueryBuilder()
                                 .relation(User, 'dep')
                                 .of(userId)
                                 .set(data.depId)
                    
                    .then(() => {
                        if(data.roleIds)
                        this.em.createQueryBuilder()
                                .relation(User, 'roles')
                                .of(userId)
                                .add(data.roleIds);
                    });
                  });

        return this.getUserById(userId);
      }
      async getUsers(pageInfo: UserQueryDTO): Promise<User[]>{
        
        return await this.em
                        .createQueryBuilder(User, 'u')
                        .leftJoinAndSelect('u.roles', 'r')
                        .leftJoinAndSelect('u.dep', 'd')
                        .select([
                          'u.id',
                          'u.username',
                          'u.email',
                          'd.id',
                          'd.depName',
                          'r.id',
                          'r.roleName',
                        ])
                        .orderBy('d.depName', 'ASC')
                        .addOrderBy('u.username')
                        .skip((pageInfo.page - 1) * pageInfo.pageSize)
                        .take(pageInfo.pageSize)
                        .cache(60000) // 1 min
                        .getMany(); //
      }
      async getUserById(userId): Promise<User>{
        // 載入roles導覽屬性
        // 設定eager=true後要把dep拿掉，重複載入SQL語法錯誤
        //return await this.userRepo.findOne(id, {relations: ['dep', 'roles']});
        // return await this.userRepo.findOneOrFail(id); // 以id搜尋，沒找到會丟出例外
        return await this.em
                        .createQueryBuilder(User, 'u')
                        .leftJoinAndSelect('u.roles', 'r')
                        .leftJoinAndSelect('u.dep', 'd')
                        .whereInIds(userId)
                        .select([
                          'u.id',
                          'u.username',
                          'u.email',
                          'd.id',
                          'd.depName',
                          'r.id',
                          'r.roleName',
                          'u.entityDate.LastUpdatedDate',
                          'u.entityDate.createDate',
                        ])
                        .getOne();
      }

      
      async updateUserDepById(userId, depId){ // 傳入userId及depId
        await this.em.createQueryBuilder()
                    .relation(User, 'dep') // 指定載入relation
                    .of(userId) // 找對應的entity，可以是id或是queryed entity
                    .set(depId); // 更新(或是新增)depId
        //.then(result => return result); 回傳void
        //return await this.userRepo.findOne(userId, {relations: ['dep', 'roles']}); // 回傳結果
        return this.getUserById(userId);
      }

      async updateUserRolesByIds(userId, data: UserDTO){
          //更新roles，必須先取的資料庫現有的資料
          const roles = await this.em.createQueryBuilder()
                                .relation(User, 'roles')
                                .of(userId)
                                .loadMany();
          //Logger.log(user);
          await this.em.createQueryBuilder()
                    .relation(User, 'roles') // 指定載入relation
                    .of(userId) // 找對應的entity，可以是id或是queryed entity
                    // 第一個參數是要新增的roles，第二個參數是要移除的roles
                    // 當然可以用lodash對陣列做操作，得到新增的陣列跟移除的陣列
                    // 但builder API一次只能有add或是remove，所以用addAndRemove是最快的
                    .addAndRemove(data.roleIds, roles.map(role => role.id))
                    //.then(result => return result); 回傳void
          //return await this.userRepo.findOne(userId, {relations: ['dep', 'roles']});
          return this.getUserById(userId);
      }

      async getUsersByDepNameById(query: UserQueryDTO){
     
        return await this.em
            .createQueryBuilder(User, 'u') // 指定User別名為u
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
          return await this.em
            .createQueryBuilder(User, 'u')
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

      async updateUserById(userId, data: UserDTO){
        await this.em.createQueryBuilder() // 更新非relation相關資料
                  .update(User) // 指定update哪一個entity
                  .set({ // 更新資料物件
                    username: data.username,
                    email: data.email,
                  })
                  // whereInIds是helper method
                  // 原本應為
                  // .where('id = :id', {id: userId})
                  .whereInIds(userId)
                  // .printSql() 可以用來除錯
                  .execute(); // 執行query
        //const user = await this.userRepo.findOne(userId, {relations: ['roles']});
        const roles = await this.em.createQueryBuilder()
                                .relation(User, 'roles')
                                .of(userId)
                                .loadMany(); // 取得roles物件陣列
        await this.em.createQueryBuilder()
                  .relation(User, 'roles')
                  .of(userId)
                  .addAndRemove(data.roleIds, roles.map(role => role.id))
                  .then(async () => {
                    await this.em.createQueryBuilder()
                               .relation(User, 'dep')
                               .of(userId)
                               .set(data.depId);
                });
        
        return this.getUserById(userId);
      }
      async deleteUser(id){
        const userDeleted = this.getUserById(id);
        return this.em.createQueryBuilder()
                   .delete()
                   .from(User)
                   .whereInIds(id)
                   .execute()
                   .then(result => userDeleted); // 回傳raw沒有資料
      }

      async findOneByToken(token){
        if (token === 'ironNest')
          return this.getUserById(10);
        else
          return null;
      }
}