import { Controller, Get } from '@nestjs/common';

import { ConfigService } from './shared/config/config.service';

@Controller()
export class AppController {
  constructor(private configService: ConfigService){}

  @Get()
  getAppIndex(){
    return this.configService.get('APP_NAME');
  }
}