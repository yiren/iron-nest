import { Inject, Injectable, forwardRef, Logger, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'shared/services/users.service';
import { UserDTO } from '../shared/DTOs/userDTO';


@Injectable()
export class AuthService {
  constructor(
      // 注入機UsersService，所以需要import UsersModule
      // 底下的provider才能被注入
      private readonly usersService: UsersService,
      // nestjs提供的jsonwebtoken wrapper
      private readonly jwtService: JwtService,
  ) {}

  async createToken(email: string, password: string){
      
      // 驗證使用者，用最簡單舉例
      if(email !== password){
        throw new UnauthorizedException();
      }
      
      const user = {email};
      const expiration = 60* 60;
      // 將使用者資訊加密
      const accessToken = this.jwtService.sign(user,{
        // 關於建立token時相關參數
        // 過期時間
        expiresIn:expiration,
        //issuer:'http://iron-nest.org',
        //algorithm:'RS256', // default是HMAC SHA256，也可以指定別的
        
      })
      return {
        expiration,
        accessToken
      };
      
  }

  async validateUser(payload) {
    return await this.usersService.findOneByEmail(payload.email);
  }
}