import { IsEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    label: string;

    @Column({ unique: true })
    login: string;

    @Column({ select: false })
    password: string;

    @Column()
    bio: string;
}
