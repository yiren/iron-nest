import { Module, forwardRef } from '@nestjs/common';

import { AuthService } from './auth.service';
import { HttpStrategy } from './passport/bearer/http.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        UserModule,
    ],
    providers: [
        AuthService,
        HttpStrategy,
    ],
})
export class AuthModule {}
