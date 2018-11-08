import { Module} from '@nestjs/common';

import { AuthService } from './auth.service';
import { HttpStrategy } from './passport/bearer/http.strategy';

import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport/jwt/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        // 建立jsonwebtoken時的相關資訊
        JwtModule.register({
            secretOrPrivateKey: 'iron-nest',
            // signOption可以在JwtModule設定
            // 或是在createToken時候設定
            signOptions:{
//                expiresIn: 3600,
                issuer:'http://iron-nest.org'
            }
        }),
        UserModule,
    ],
    controllers:[AuthController],
    providers: [
        AuthService,
        HttpStrategy,
        JwtStrategy,
    ],
})
export class AuthModule {}
