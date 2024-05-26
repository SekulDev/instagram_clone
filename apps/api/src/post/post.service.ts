import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreatePostDto } from "@repo/types";

import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

import { Post } from "./post.entity";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private usersService: UserService,
    ) {}

    async findOne(id: number): Promise<Post | null> {
        const post = await this.postRepository
            .createQueryBuilder("post")
            .where("post.id = :id", { id })
            .loadRelationCountAndMap("post.likes", "post.likes")
            .leftJoinAndSelect("post.author", "author")
            .getOne();
        if (!post) {
            throw new NotFoundException("No post with this id");
        }
        return post;
    }

    async findPostsByAuthor(username: string) {
        const user = await this.usersService.getUserByLogin(username);
        const posts = await this.postRepository
            .createQueryBuilder("post")
            .where("post.author = :id", { id: user.id })
            .loadRelationCountAndMap("post.likes", "post.likes")
            .getMany();
        return posts;
    }

    async create(username: string, dto: CreatePostDto) {
        const user = await this.usersService.getUserByLogin(username);
        const postEntity = this.postRepository.create({
            author: user,
            description: dto.description,
            images: dto.images,
        });

        const post = await this.postRepository.save(postEntity);
        return post;
    }
}
