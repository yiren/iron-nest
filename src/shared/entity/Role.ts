import {BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";

import { EntityDate } from './EntityDate';
import { User } from "./User";

@Entity()
export class Role {
    
    constructor(){
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
    })
    roleName: string;

    @ManyToMany(type => User, user => user.roles)
    users: User[];

    @Column(type => EntityDate)
    entityDate: EntityDate ;

    @BeforeInsert()
    updateDatesWhenInsert(){
        this.entityDate.createDate = new Date();
        this.entityDate.LastUpdatedDate = new Date();
    }

    @BeforeUpdate()
    updateDateWhenUpdate(){
        this.entityDate.LastUpdatedDate = new Date();
    }
}
