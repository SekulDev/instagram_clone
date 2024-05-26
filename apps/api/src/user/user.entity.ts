import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    label: string;

    @Column()
    login: string;

    @Column({ select: false })
    password: string;

    @Column()
    bio: string;
}
