import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseType } from 'typeorm';
import { HttpExceptionFilter } from './filters/httpexception.filter';
import { Module } from '@nestjs/common';
import { SimpleAuthGuard } from './guards/simple-auth.guard';
import { TransformResInterceptor } from './interceptors/transformRes.interceptor';
import { TypeORMConfigService } from './config/typeorm.config.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserDTOValidationPipe } from './pipes/userDTOValidation.pipe';
import { async } from 'rxjs/internal/scheduler/async';
import { userEntities } from './entity';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync(
        {
            imports: [ConfigModule],
            inject: [
                ConfigService,
            ],
            useClass: TypeORMConfigService,
           
        //    useFactory: async (configService: ConfigService) => ({
        //         type: 'postgres',//configService.get('DB_TYPE') as DatabaseType,
        //         host: configService.get('DB_HOST'),
        //         port: Number(configService.get('DB_PORT')),
        //         username: configService.get('DB_USERNAME'),
        //         password: configService.get('DB_PW'),
        //         database: configService.get('DB_NAME'),
        //         synchronize: configService.get('DB_TYPEORM_SYNC') === 'true',
        //         logging: configService.get('DB_TYPEORM_LOG') === 'true',
        //         entities: [
        //             'src/shared/entity/**/*.ts', // 在entity目錄下新增index.ts，把相關的entity export陣列方便管理
        //         ],
        //         migrations: [
        //            'src/shared/migration/**/*.ts',
        //         ],
        //         subscribers: [
        //            'src/shared/subscriber/**/*.ts',
        //         ],
        //    }),
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
