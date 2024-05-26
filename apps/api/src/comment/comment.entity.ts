import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Post } from "src/post/post.entity";
import { User } from "src/user/user.entity";

@Entity("comments")
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => User)
    @JoinColumn({ name: "author" })
    author: User;

    @ManyToOne((type) => Post)
    @JoinColumn({ name: "post" })
    post: User;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: Date;
}
