import { IsEmail } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Follow } from "src/follow/follow.entity";
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
}
