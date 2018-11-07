import { HttpExceptionFilter } from './filters/httpexception.filter';
import { Module } from '@nestjs/common';
import { SimpleAuthGuard } from './guards/simple-auth.guard';
import { TransformResInterceptor } from './interceptors/transformRes.interceptor';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserDTOValidationPipe } from './pipes/userDTOValidation.pipe';
import { userEntities } from './entity';
@Module({
    imports: [
        TypeOrmModule.forRoot(
        {
            type: "postgres",
            host: "localhost",
           port: 5432,
           username: "postgres",
           password: "root",
           database: "users",
           synchronize: true,
           logging: true,
           entities: [
             ...userEntities, // 在entity目錄下新增index.ts，把相關的entity export陣列方便管理
           ],
           migrations: [
              "src/shared/migration/**/*.ts"
           ],
           subscribers: [
              "src/shared/subscriber/**/*.ts"
           ],
        },
        ),
    ],
    providers: [
        UserDTOValidationPipe,
        SimpleAuthGuard,
        HttpExceptionFilter,
        TransformResInterceptor,
        
    ],
    exports: [
        UserDTOValidationPipe,
        SimpleAuthGuard,
        HttpExceptionFilter,
        TransformResInterceptor,
       
    ],
    })
export class SharedModule {}
