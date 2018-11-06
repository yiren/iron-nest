import {BeforeInsert, BeforeUpdate, Column, Entity} from "typeorm";

@Entity()
export class EntityDate {
    @Column({
        nullable: true,
    })
    LastUpdatedDate: Date;

    @Column({
        nullable: true,
    })
    createDate: Date;
}