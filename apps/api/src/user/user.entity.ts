import { IsEmail } from "class-validator";
import { Column, Entity, IsNull, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Comment } from "src/comment/comment.entity";
import { Follow } from "src/follow/follow.entity";
import { Like } from "src/like/like.entity";
import { Post } from "src/post/post.entity";

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

    @Column()
    avatar_url: string;

    @OneToMany(() => Follow, (follow) => follow.following)
    followers: Follow[];

    @OneToMany(() => Follow, (follow) => follow.follower)
    following: Follow[];

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    @OneToMany(() => Comment, (comment) => comment.author)
    comments: Comment[];

    @Column({ default: null, select: false })
    change_password_url: string;
}
