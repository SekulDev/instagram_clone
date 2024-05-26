import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PostService } from "src/post/post.service";
import { UserService } from "src/user/user.service";

import { Like } from "./like.entity";

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like) private likeRepository: Repository<Like>,
        private usersService: UserService,
        private postService: PostService,
    ) {}

    async addLike(username: string, postId: number) {
        const user = await this.usersService.getUserByLogin(username);
        const post = await this.postService.findOne(postId);
        if (!post) {
            throw new NotFoundException("No post with this id");
        }
        try {
            const likeEntity = new Like();
            likeEntity.user = user;
            likeEntity.post = post;

            await this.likeRepository.save(likeEntity);
            return;
        } catch (e) {
            throw new UnauthorizedException("This post is already liked");
        }
    }

    async removeLike(username: string, postId: number) {
        const user = await this.usersService.getUserByLogin(username);
        const post = await this.postService.findOne(postId);
        if (!post) {
            throw new NotFoundException("No post with this id");
        }
        const likeRecord = await this.likeRepository.findOne({
            where: {
                user: {
                    id: user.id,
                },
                post: {
                    id: post.id,
                },
            },
        });
        if (likeRecord) {
            await this.likeRepository.remove(likeRecord);
        } else {
            throw new UnauthorizedException("This post is not liked");
        }
    }
}
