import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Comment } from "src/comment/comment.entity";
import { Like } from "src/like/like.entity";
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

    @OneToMany(() => Like, (like) => like.post)
    likes: Like[];

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];
}
