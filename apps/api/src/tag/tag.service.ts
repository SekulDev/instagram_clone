import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Post } from "src/post/post.entity";
import { PostService } from "src/post/post.service";

import { Tag } from "./tag.entity";

@Injectable()
export class TagService {
    constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

    async updatePostTags(post: Post, tags: string[]) {
        await this.tagRepository.delete({ post: post });

        const tagsEntities = [];
        for (const tag of tags) {
            const tagEntity = new Tag();
            tagEntity.post = post;
            tagEntity.name = tag;
            tagsEntities.push(tagEntity);
        }
        await this.tagRepository.save(tagsEntities);
    }

    async findMostPopular(limit: number) {
        return await this.tagRepository
            .createQueryBuilder("tag")
            .innerJoin("tag.post", "post")
            .select("tag.name", "name")
            .addSelect("COUNT(post.id)", "popularity")
            .groupBy("tag.name")
            .orderBy("popularity", "DESC")
            .limit(limit)
            .getRawMany();
    }

    async getTag(name: string) {
        const tag = await this.tagRepository
            .createQueryBuilder("tag")
            .innerJoin("tag.post", "post")
            .select("tag.name", "name")
            .addSelect("COUNT(post.id)", "popularity")
            .where("LOWER(tag.name) = :name", { name })
            .groupBy("tag.name")
            .getRawOne();
        if (!tag) {
            throw new NotFoundException("No tag with this name");
        }
        return tag;
    }
}
