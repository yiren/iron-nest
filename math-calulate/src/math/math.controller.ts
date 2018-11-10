import { Controller } from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';

@Controller('math')
export class MathController {
    @MessagePattern({cmd: 'sum'})
    sum(data: number[]){
       return (data || []).reduce((a, b) => a + b);
    }
}
