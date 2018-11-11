import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/common/enums/transport.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.connectMicroservice({
      transport:Transport.TCP,
      options:{
        port:5000  
      } 
  }) ; 
  await app.listen(5050);
}
bootstrap();
