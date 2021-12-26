import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity() 
export class Students extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    age!: number;

    @Column()
    email!: string;

    @Column()
    hobby!: string;
}