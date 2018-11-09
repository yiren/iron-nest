import { Controller, Get, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiUseTags, ApiCreatedResponse, ApiForbiddenResponse, ApiImplicitBody } from '@nestjs/swagger';


@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @ApiCreatedResponse({description:'Get Bearer Token'})
    @ApiForbiddenResponse({description:'Invalid username/password'})
    @Post('getToken')
    getTokenByUserId(
        @Body('email') email: string,
        @Body('password') password: string,
        ){
        
        return this.authService.createToken(email, password);
        
    }
}