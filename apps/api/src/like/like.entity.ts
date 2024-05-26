import { Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Post } from "src/post/post.entity";
import { User } from "src/user/user.entity";

@Entity("likes")
@Index(["user", "post"], { unique: true })
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => User, (user) => user.likes)
    @JoinColumn({ name: "user" })
    user: User;

    @ManyToOne((type) => Post, (post) => post.likes)
    @JoinColumn({ name: "post" })
    post: Post;
}
