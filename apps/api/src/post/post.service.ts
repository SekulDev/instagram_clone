import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreatePostDto, UpdatePostDto } from "@repo/types";

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

    async findOne(id: number, currentUserId?: number): Promise<Post | null> {
        const queryBuilder = this.postRepository
            .createQueryBuilder("post")
            .where("post.id = :id", { id })
            .loadRelationCountAndMap("post.likes", "post.likes")
            .loadRelationCountAndMap("post.comments", "post.comments")
            .leftJoinAndSelect("post.author", "author")
            .leftJoinAndSelect("post.tags", "tags");

        if (currentUserId) {
            queryBuilder.loadRelationCountAndMap("post.is_liking", "post.likes", "like", (query) => {
                return query.where("like.user = :id", { id: currentUserId });
            });
        }

        const post = await queryBuilder.getOne();

        if (!post) {
            throw new NotFoundException("No post with this id");
        }
        return post;
    }

    async findPostsByAuthor(username: string, currentUserId?: number) {
        const user = await this.usersService.getUserByLogin(username);

        const queryBuilder = this.postRepository
            .createQueryBuilder("post")
            .where("post.author = :id", { id: user.id })
            .loadRelationCountAndMap("post.likes", "post.likes")
            .loadRelationCountAndMap("post.comments", "post.comments")
            .leftJoinAndSelect("post.tags", "tags");

        if (currentUserId) {
            queryBuilder.loadRelationCountAndMap("post.is_liking", "post.likes", "like", (query) => {
                return query.where("like.user = :id", { id: currentUserId });
            });
        }

        const posts = await queryBuilder.orderBy("post.created_at", "DESC").getMany();
        return posts;
    }

    async update(username: string, postId: number, dto: UpdatePostDto) {
        const user = await this.usersService.getUserByLogin(username);
        const post = await this.findOne(postId);
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
