import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import { User } from "./User";

@Entity("Departments")
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    depName: string;
    
    @OneToMany(type => User, user => user.dep
        ,{
            onDelete: 'NO ACTION', // 如果刪除Department，不會一併把UserEntity刪除，另有CASCADE就會
         },
        ) // type指定User， inverse
    users: User[];

}
