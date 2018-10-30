import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { HttpException } from '@nestjs/common';

@Catch(HttpException) // 指定Catch HttpException
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) { // 預設傳入HttpException、及ArgumentHost物件
    const ctx = host.switchToHttp(); // ArgumentsHost是個Wrapper，包含request、response等資訊
    const response = ctx.getResponse(); // 取得request物件，這裡指的是Express中request，相關屬性可以查閱Express API
    const request = ctx.getRequest(); // 取得response物件
    const status = exception.getStatus();

    response // 自訂回覆格式
      .status(status)
      .json({
        message: '自訂錯誤訊息',
        timestamp: new Date().toISOString(),
        requestedFrom: request.hostname,
      });
  }
}