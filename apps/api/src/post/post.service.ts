import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreatePostDto, UpdatePostDto } from "@repo/types";

import { Tag } from "src/tag/tag.entity";
import { TagService } from "src/tag/tag.service";
import { UserService } from "src/user/user.service";

import { Post } from "./post.entity";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private usersService: UserService,
        private tagService: TagService,
    ) {}

    async findOne(id: number): Promise<Post | null> {
        const post = await this.postRepository
            .createQueryBuilder("post")
            .where("post.id = :id", { id })
            .loadRelationCountAndMap("post.likes", "post.likes")
            .leftJoinAndSelect("post.author", "author")
            .leftJoinAndSelect("post.tags", "tags")
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
            .leftJoinAndSelect("post.tags", "tags")
            .getMany();
        return posts;
    }

    async update(username: string, postId: number, dto: UpdatePostDto) {
        const user = await this.usersService.getUserByLogin(username);
        let post = await this.findOne(postId);
        if (post.author.id !== user.id) {
            throw new UnauthorizedException("Cannot edit not own posts");
        }

        await this.tagService.updatePostTags(post, dto.tags);

        await this.postRepository.save({
            description: dto.description,
        });

        const postWithTags = await this.postRepository.findOne({
            where: { id: post.id },
            relations: ["tags"],
        });

        return postWithTags;
    }

    async create(username: string, dto: CreatePostDto) {
        const user = await this.usersService.getUserByLogin(username);

        const postEntity = this.postRepository.create({
            author: user,
            description: dto.description,
            images: dto.images,
        });

        const post = await this.postRepository.save(postEntity);
        await this.tagService.updatePostTags(post, dto.tags);

        const postWithTags = await this.postRepository.findOne({
            where: { id: post.id },
            relations: ["tags"],
        });

        return postWithTags;
    }
}
