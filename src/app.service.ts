import { Connection, EntityManager, Repository } from 'typeorm';
import { InjectConnection, InjectEntityManager, InjectRepository } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';
import { User } from 'shared/entity/User';
import { UserDTO } from './shared/DTOs/userDTO';

export class AppService {
  constructor(
    @InjectRepository(User) // 注入 typeorm repository
    private readonly userRepo: Repository<User>,
  ){}
  

  async addUser(data: UserDTO): Promise<User>{
    const user = new User();
    user.username = data.username;
    user.email = data.email;
    return await this.userRepo.save(user); // 新增一筆user資料
  }
  
  async getUsers(): Promise<User[]>{
    return await this.userRepo.find(); // find 沒傳入物件代表撈全部資料
  }

  async getUserById(id): Promise<User>{
    return await this.userRepo.findOne(id); // 以id搜尋，沒找到return null
    // return await this.userRepo.findOneOrFail(id); // 以id搜尋，沒找到會丟出例外
  }

  async updateUser(id, data: UserDTO){
    return await this.userRepo.update(id, data); // 用data裡的值更新到資料庫
  }

  async deleteUser(id){
    return this.userRepo.delete(id); // delete只需要傳入id
  }
}
