import { Module } from '@nestjs/common';
import { SharedModule } from 'shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { controllersForUser } from './controllers';
import { servicesForUser } from 'shared/services';
import { userEntities } from 'shared/entity';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        // PassportModule.register({defaultStrategy: 'bearer'})
        // 指定strategy，不用在AuthGuard裡特別指定
        PassportModule.register({defaultStrategy: 'jwt'}),
        SharedModule, // import shared module
        TypeOrmModule.forFeature([...userEntities]), // forFeature告訴nest.js在typeorm要存取相關的entity
    ],
    controllers: [
       ...controllersForUser,
    ],
    providers: [
        ...servicesForUser,
    ],
    exports:[
        ...servicesForUser,
    ]
})
export class UserModule {}
