import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { UsersService } from 'shared/services/users.service';

@Injectable()
export class AuthService {
  constructor(
      // 注入機UsersService，所以需要import UsersModule
      // 底下的provider才能被注入
      private readonly usersService: UsersService,
  ) {}

  async validateUser(token: string): Promise<any> {
    // 先假定token已知，由userService回傳使用者資料
    // 如果token不正確則回傳null
    return await this.usersService.findOneByToken(token);
  }
}