import { ConfigService } from './config.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [
        // 這是nestjs另外一種Dependency Injection的方式
        {
            // 如果nestjs IoC Container要ConfigService的時候
            provide: ConfigService,
            // 回傳"這個"值
            // 剛剛的ConfigService要傳入.env路徑及檔名
            useValue: new ConfigService(`${process.env.NODE_ENV || 'development'}.env`)
        }
    ],
    // export表示這個Module被import後，ConfigService可以被其他Module Inject
    exports: [ConfigService]
})
export class ConfigModule {}