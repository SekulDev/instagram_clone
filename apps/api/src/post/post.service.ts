import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreatePostDto } from "@repo/types";

import { UserService } from "src/user/user.service";

import { Post } from "./post.entity";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private usersService: UserService,
    ) {}

    findOne(id: number): Promise<Post | null> {
        return this.postRepository.findOneBy({ id });
    }

    async findPostsByAuthor(username: string) {
        const user = await this.usersService.getUserByLogin(username);
        return await this.postRepository.findBy({ author: { id: user.id } });
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
