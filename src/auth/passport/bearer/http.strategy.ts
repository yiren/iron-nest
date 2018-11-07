import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from 'auth/auth.service';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-http-bearer';

@Injectable()
// 要繼承@nest/passport下的PassportStrategy並傳入passport
// 本日是以http bearer為例
export class HttpStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService){
        super();
    }
    async validate(token: string){
        const user = await this.authService.validateUser(token);
        if( !user){ // 如果用token找不到使用者，就丟unauthorized exception
            return new UnauthorizedException();
        }
        return user; // 有找到使用者，passport會把user物件存在req中
    }
}