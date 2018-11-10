import { Controller, Get, Logger } from '@nestjs/common';

import { ConfigService } from './shared/config/config.service';
import { ClientProxy, Transport, ClientProxyFactory, Client } from '@nestjs/microservices';

@Controller()
export class AppController {
  @Client({ transport: Transport.TCP, options: {
    port: 4500,
  }})
  private client: ClientProxy;
  
  constructor(private configService: ConfigService){
  }
  @Get()
  getAppIndex(){
    const pattern = {cmd: 'sum'};
    const payload = [1, 2, 3];
    return this.client.send(pattern, payload);
    //return this.configService.get('APP_NAME');
  }
}