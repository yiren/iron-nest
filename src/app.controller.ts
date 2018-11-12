import { Controller, Get, Logger } from '@nestjs/common';

import { ConfigService } from './shared/config/config.service';
import { ClientProxy, Transport, Client, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {

  @Client({transport: Transport.TCP, options:{
      port:5000,
  }})
  tpcClient: ClientProxy;


  constructor(private configService: ConfigService){
  }
  @Get()
  getAppIndex(){
    const pattern={mathCal:'sum'}
    const data = [1, 2, 3];
    return this.tpcClient.send(pattern, data);
    //return this.configService.get('APP_NAME');
  }

  
}