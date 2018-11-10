import { ConfigService } from './config.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(`${process.env.NODE_ENV || 'development'}.env`)
        }
    ],
    exports: [ConfigService]
})
export class ConfigModule {}