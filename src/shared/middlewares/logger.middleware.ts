import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware { // 必須實作NestMiddleware介面
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => { // 會接收request、response及next方法
      console.log('Logger....');
      next(); // 告訴nest.js繼續下一個middleware，如果沒有，則交給request handler
    };
  }
}