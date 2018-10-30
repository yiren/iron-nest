import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate { // 實作CanActive介面
  constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext, // 可以取得對應controller及request/request資訊
  ): boolean | Promise<boolean> | Observable<boolean>  { // 回傳boolean型別，支援非同步
    // 驗證邏輯
    const req = context.switchToHttp().getRequest(); // 取得request物件
    const ctrl = context.getClass(); // 利用reflect metadata取得Controller name
    Logger.log(`Controller Name: ${ctrl.name}`);
    const handler = context.getHandler(); // 利用reflect metadata 取得存取資源對應的方法
    Logger.log(`Method Name: ${handler.name}`);

    const roles = this.reflector.get<string[]>('roles', handler); // 利用get取得'roles'的值，第二個參數是告訴reflector取得哪一個方法的metadata
    // 使用Logger來測試有沒有取得roles的對應的value
    Logger.log('---允許的Roles有---');
    Logger.log(roles);
    
    
    if(req.hostname ==='localhost'){
        return true;
    }
    return false
  }
}