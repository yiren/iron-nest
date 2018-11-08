import { Controller, Get, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('getToken')
    getTokenByUserId(
        @Body('email') email: string,
        @Body('password') password: string,
        ){
        
        return this.authService.createToken(email, password);
        
    }
}