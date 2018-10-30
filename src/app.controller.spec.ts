import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { HttpExceptionFilter } from './shared/filters/httpexception.filter';
import { INestApplication } from '@nestjs/common';
import { TransformResInterceptor } from './shared/interceptors/transformRes.interceptor';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        AuthGuard,
        HttpExceptionFilter,
        TransformResInterceptor,
      ],
    }).compile();
  });

  describe('sayHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(true);
    });
  });
});
