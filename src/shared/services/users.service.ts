import { DepartmentService } from './deps.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'shared/entity/User';
import { UserDTO } from 'shared/DTOs/userDTO';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) // 注入 typeorm repository
        private readonly userRepo: Repository<User>,
        private depService: DepartmentService,
      ){}
      
    
      async addUser(data: UserDTO): Promise<User>{
        const user = new User();
        user.username = data.username;
        user.email = data.email;
        //user.depId  = data.depId; 
        user.dep = await this.depService.getDepById(data.depId);
        return await this.userRepo.save(user); // 新增一筆user資料
      }
      
      async getUsers(): Promise<User[]>{
        return await this.userRepo.find({relations: ['dep']}); // find 沒傳入物件代表撈全部資料
      }
    
      async getUserById(id): Promise<User>{
        return await this.userRepo.findOne(id, {relations: ['dep']}); // 以id搜尋，沒找到return null
        // return await this.userRepo.findOneOrFail(id); // 以id搜尋，沒找到會丟出例外
      }
    
      async updateUser(id, data: UserDTO){
        const user = new User();
        user.username = data.username;
        user.email = data.email;
        user.dep = await this.depService.getDepById(data.depId);
        return await this.userRepo.update(id, user); // 用data裡的值更新到資料庫
      }
    
      async deleteUser(id){
        return this.userRepo.delete(id); // delete只需要傳入id
      }
}