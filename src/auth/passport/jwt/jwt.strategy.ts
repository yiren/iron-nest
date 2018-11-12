import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from 'auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            // 這裡沒有intellisense可以用，下面這一段是說
            // 要從header取得bearer token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
            // 這裡的key就是要跟create token時的key一樣
            secretOrKey: 'iron-nest',
            issuer:'http://iron-nest.org'
        });
    }
    
    // Passport會自動verify jwt，如果key不正確，或是相關資訊
    // 不正確，如issuer
    async validate(payload) {
        const user = await this.authService.validateUser(payload);
        if(!user) throw new UnauthorizedException();
        return user
    }
    
}