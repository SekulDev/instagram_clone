import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { User } from "src/user/user.entity";

@Entity("contents")
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    filename: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne((type) => User)
    @JoinColumn({ name: "user" })
    user: User;
}
