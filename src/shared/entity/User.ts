import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId} from "typeorm";

import { Department } from "./Department";

@Entity('My_Users') // 指定table name
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    // @Column為對應的資料庫欄位，或是傳入Column Options物件
    @Column()
    username: string;
    
    // 傳入Column Options物件設定mapping的欄位屬性
    @Column({
        type: 'varchar',
        length: 50,
    })
    email: string;
    
    @Column({
        default: true, // 給預設值
    })
    isActive: boolean;

    @ManyToOne(type => Department, dep => dep.users)
    dep: Department;

    @RelationId((user: User) => user.dep)
    depId: number;
    
}