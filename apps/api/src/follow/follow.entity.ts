import { Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "src/user/user.entity";

@Entity("follows")
@Index(["follower", "following"], { unique: true })
export class Follow {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => User, (user) => user.following)
    @JoinColumn({ name: "follower" })
    follower: User;

    @ManyToOne((type) => User, (user) => user.followers)
    @JoinColumn({ name: "following" })
    following: User;
}
