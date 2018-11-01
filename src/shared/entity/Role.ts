import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";

import { User } from "./User";

@Entity()
export class Role {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
    })
    roleName: string;

    @ManyToMany(type => User, user => user.roles)
    users: User[];
}
