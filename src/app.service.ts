import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'shared/entity/User';
import { UserDTO } from './shared/DTOs/userDTO';

export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ){}
  sayHello(): string {
    return 'Hello Docker-compose!';
  }

  async addUser(data: UserDTO){
    const user = new User();
    user.username = data.username;
    user.email = data.email;

    return await this.userRepo.save(user);
  }
}
