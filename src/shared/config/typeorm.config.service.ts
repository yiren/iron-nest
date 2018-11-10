import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from './config.service';
import { DatabaseType } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { userEntities } from 'shared/entity';

@Injectable()
export class TypeORMConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions{
        return {
                type: 'postgres',//configService.get('DB_TYPE') as DatabaseType,
                host: this.configService.get('DB_HOST'),
                port: Number(this.configService.get('DB_PORT')),
                username: this.configService.get('DB_USERNAME'),
                password: this.configService.getDbPassword(),
                database: this.configService.get('DB_NAME'),
                synchronize: this.configService.get('DB_TYPEORM_SYNC') === 'true',
                logging: this.configService.get('DB_TYPEORM_LOG') === 'true',
                entities: [
                    ...userEntities, // 在entity目錄下新增index.ts，把相關的entity export陣列方便管理
                ],
                migrations: [
                   'src/shared/migration/**/*.ts',
                ],
                subscribers: [
                   'src/shared/subscriber/**/*.ts',
                ],
        };
    }
}