import { PrimaryGeneratedColumn, Entity, BaseEntity, Column, Generated, CreateDateColumn } from "typeorm";

@Entity()
export class TokenList extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    unique_id!: string;

    @Column()
    token_issued!: string;

    @CreateDateColumn({ type: "timestamptz" })
    token_created_on!: Date;
}