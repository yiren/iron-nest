import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Transport, ClientProxy } from '@nestjs/microservices';
import { Client } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Client({transport:Transport.TCP, options:{
    port:3001
  }})
  client: ClientProxy

  @MessagePattern({mathCal:'sum'})
  root(data:number[]): number {
    return (data || []).reduce((a, b)=> a + b);
  }

  @Get()
  async getAllUsers(){
    const data= await this.client.send({userData:'findAll'}, '');
    return data;
  }
}
