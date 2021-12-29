import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Movies extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 100})
    name!: string;

    @Column()
    year_released!: number;

    @Column()
    rating!: number;
}