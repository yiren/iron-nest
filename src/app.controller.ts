import { Controller, Get, Logger } from '@nestjs/common';

import { ConfigService } from './shared/config/config.service';
import { ClientProxy, Transport, ClientProxyFactory, Client } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private configService: ConfigService){
  }
  @Get()
  getAppIndex(){
    return this.configService.get('APP_NAME');
  }
}