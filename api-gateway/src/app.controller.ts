import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Client, Transport, ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  // 昨天的仍可以保留
  @Client({transport:Transport.TCP, options:{
    port:5000, // remote port為5000
  }})
  client: ClientProxy;

  // 指定redis server作為messaging協定
  // url指定docker-machine ip及redis port
  @Client({transport:Transport.REDIS, options:{
    url:'redis://192.168.99.101:6379',
  }})
  redisClient: ClientProxy;

  // 指定nats server作為messaging協定
  // url指定docker-machine ip及nats port
  @Client({transport:Transport.NATS, options:{
    url:'nats://192.168.99.101:4222'
  }})
  natsClient: ClientProxy;

  @Get('users')
  async getRemoteUsers() {
    const pattern = {accountData:'users'};
    const data = '';
    return await this.client.send(pattern, data);
    
  }

  @Get('roles')
  async getRemoteRoles() {
    const pattern = {accountData:'roles'};
    const data = '';
    return await this.redisClient.send(pattern, data);
  }
  @Get('deps')
  async getRemoteDeps() {
    const pattern = {accountData:'deps'};
    const data = '';
    return await this.natsClient.send(pattern, data);
  }
}
