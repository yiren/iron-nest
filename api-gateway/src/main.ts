import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 
  app.connectMicroservice({ // 設定app也具有nestjs定義的microservice的特性
      options:{
        port:3001, // 設定TCP port 
        retryAttempts: 5, // 重試5次後中止
        retryDelay: 1000, // 每1秒重試一次
      },
  })
  app.startAllMicroservicesAsync(); // 啟動nest application同時也啟動microservice
  await app.listen(3000);
}
bootstrap();
