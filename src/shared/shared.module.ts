import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserDTOValidationPipe } from './pipes/userDTOValidation.pipe';
@Module({
    imports:[
        TypeOrmModule.forRoot(),
    ],
    providers: [
        UserDTOValidationPipe,
    ],
    })
export class SharedModule {}
