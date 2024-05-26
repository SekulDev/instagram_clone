import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Post } from "src/post/post.entity";

@Entity("tags")
@Index(["name", "post"], { unique: true })
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => Post, (post) => post.tags)
    @JoinColumn({ name: "post" })
    post: Post;
}
