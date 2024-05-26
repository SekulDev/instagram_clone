import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "src/user/user.entity";

@Entity("posts")
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => User)
    @JoinColumn({ name: "author" })
    author: User;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ type: "json" })
    images: string[];
}
