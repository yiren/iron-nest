import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Client, Transport, ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  // 指定通訊為TPC，remote port為5000
  // nestjs以ClientProxy來處理microservice連線
  @Client({transport:Transport.TCP, options:{
    port:5000, // remote port為5000
  }})
  client: ClientProxy;

  @Get('users')
  async getRemoteUsers() {
    const pattern = {accountData:'users'};
    const data = '';
    return await this.client.send(pattern, data);
  }
}
