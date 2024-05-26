import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PostService } from "src/post/post.service";
import { UserService } from "src/user/user.service";

import { Comment } from "./comment.entity";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
        private postService: PostService,
        private usersService: UserService,
    ) {}

    async findForPost(postId: number) {
        const comments = await this.commentRepository
            .createQueryBuilder("comment")
            .where("comment.post = :id", { id: postId })
            .leftJoinAndSelect("comment.author", "author")
            .getMany();
        return comments;
    }

    async create(username: string, postId: number, dto: Record<string, any>) {
        const user = await this.usersService.getUserByLogin(username);
        const post = await this.postService.findOne(postId);
        const commentEntity = this.commentRepository.create({
            author: user,
            content: dto.content,
            post: post,
        });

        const comment = await this.commentRepository.save(commentEntity);
        return comment;
    }
}
