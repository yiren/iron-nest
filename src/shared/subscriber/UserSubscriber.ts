import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from "typeorm";

import { InjectEntityManager } from '@nestjs/typeorm';
import { Logger } from "@nestjs/common";
import { Role } from "shared/entity/Role";
import { User } from '../entity/User';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
     
    listenTo(){
        return User;
    }
    
    async beforeInsert(event: InsertEvent<User>){
        Logger.log(`-----Before Insert------`);
        Logger.log(event.entity); // 顯示insert之前entity的資訊
        event.entity.entityDate.createDate = new Date();
        event.entity.entityDate.LastUpdatedDate = new Date();
    }

    async afterInsert(event: InsertEvent<User>){
        Logger.log(`-----After Insert------`);
        // 希望在insert user後自動加入user權限
        // 使用Subscriber的好處是可以從event取得entity manager物件
        // 進而可以使用querybuilder做任何SQL操作
        const role = await event.manager.createQueryBuilder(Role, 'r')
                   .where('r.roleName = :name', {name: 'user'})
                   .getOne();
        // 要加入user使用relationquerybuilder
        event.manager.createQueryBuilder(User, 'u')
                     .relation('roles')
                     .of(event.entity)
                     .add(role);
    }
}
