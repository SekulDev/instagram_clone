import { Injectable } from "@nestjs/common";
import { DataSource, Like } from "typeorm";

import { Comment } from "src/comment/comment.entity";
import { Follow } from "src/follow/follow.entity";
import { Post } from "src/post/post.entity";
import { PostService } from "src/post/post.service";
import { Tag } from "src/tag/tag.entity";

@Injectable()
export class ExploreService {
    constructor(
        private dataSource: DataSource,
        private postService: PostService,
    ) {}

    private async getUserTagCounts(userId: number, tag?: string) {
        const query = this.dataSource
            .createQueryBuilder()
            .select("tag.name", "name")
            .addSelect("COUNT(*)", "count")
            .from(Tag, "tag")
            .leftJoin("likes", "like", "like.post = tag.post")
            .leftJoin("comments", "comment", "comment.post = tag.post")
            .where("like.user = :userId OR comment.author = :userId", { userId });

        if (tag) {
            query.andWhere("tag.name = :tag", { tag });
        }

        const tagCounts = await query.groupBy("tag.name").orderBy("count", "DESC").getRawMany();

        return tagCounts;
    }

    private async getPostsFromFollowedUsers(userId: number, limit: number = 10, tag?: string) {
        const query = this.dataSource
            .createQueryBuilder(Post, "post")
            .innerJoin(Follow, "follow", "follow.following = post.author")
            .loadRelationCountAndMap("post.likes", "post.likes")
            .loadRelationCountAndMap("post.comments", "post.comments")
            .leftJoinAndSelect("post.author", "author")
            .leftJoinAndSelect("post.tags", "tags")
            .where("follow.follower = :userId", { userId });

        if (tag) {
            query.innerJoin(Tag, "tag", "tag.post = post.id").andWhere("tag.name = :tag", { tag });
        }

        query.loadRelationCountAndMap("post.is_liking", "post.likes", "like", (query) => {
            return query.where("like.user = :id", { id: userId });
        });

        const followedPosts = await query.orderBy("post.created_at", "DESC").limit(limit).getMany();

        return followedPosts;
    }

    private async getMostLikedPosts(userId: number, excludedPostIds: number[], limit: number, tag?: string) {
        const query = this.dataSource
            .createQueryBuilder(Post, "post")
            .leftJoinAndSelect("post.likes", "like")
            .loadRelationCountAndMap("post.likes", "post.likes")
            .loadRelationCountAndMap("post.comments", "post.comments")
            .leftJoinAndSelect("post.author", "author")
            .leftJoinAndSelect("post.tags", "tags");

        query.loadRelationCountAndMap("post.is_liking", "post.likes", "like", (query) => {
            return query.where("like.user = :id", { id: userId });
        });

        if (tag) {
            query.where("tags.name = :tag", { tag });
        }

        if (excludedPostIds.length > 0) {
            query.where("post.id NOT IN (:...excludedPostIds)", { excludedPostIds });
        }

        const mostLikedPosts = await query
            .groupBy("post.id")
            .orderBy("COUNT(like.id)", "DESC")
            .addOrderBy("post.created_at", "DESC")
            .limit(limit)
            .getMany();

        return mostLikedPosts;
    }

    async getRecommendedPosts(userId: number, limit: number = 10, tag?: string) {
        if (!tag) {
            const tagCounts = await this.getUserTagCounts(userId, tag);
            const tagNames = tagCounts.map((tc) => tc.name);

            const recommendedQuery = this.dataSource
                .createQueryBuilder(Post, "post")
                .innerJoin(Tag, "tag", "tag.post = post.id");

            if (tagNames.length > 0) {
                recommendedQuery.where("tag.name IN (:...tagNames)", { tagNames });
            }

            recommendedQuery
                .loadRelationCountAndMap("post.likes", "post.likes")
                .loadRelationCountAndMap("post.comments", "post.comments")
                .leftJoinAndSelect("post.author", "author")
                .leftJoinAndSelect("post.tags", "tags");

            recommendedQuery.loadRelationCountAndMap("post.is_liking", "post.likes", "like", (query) => {
                return query.where("like.user = :id", { id: userId });
            });

            if (tag) {
                recommendedQuery.andWhere("tag.name = :tag", { tag });
            }

            const recommendedPosts = await recommendedQuery.orderBy("post.created_at", "DESC").limit(limit).getMany();

            const followedPosts = await this.getPostsFromFollowedUsers(userId, limit, tag);

            const allPosts = [...recommendedPosts, ...followedPosts];
            const uniquePosts = Array.from(new Set(allPosts.map((post) => post.id))).map((id) =>
                allPosts.find((post) => post.id === id),
            );

            if (uniquePosts.length < limit) {
                const excludedPostIds = uniquePosts.map((post) => post.id);
                const additionalPosts = await this.getMostLikedPosts(
                    userId,
                    excludedPostIds,
                    limit - uniquePosts.length,
                    tag,
                );
                uniquePosts.push(...additionalPosts);
            }

            const posts = uniquePosts.slice(0, limit);
            const p = [];
            for (const post of posts) {
                p.push(await this.postService.findOne(post.id));
            }

            return p;
        } else {
            const posts = await this.getMostLikedPosts(userId, [], limit, tag);
            const p = [];
            for (const post of posts) {
                p.push(await this.postService.findOne(post.id));
            }

            return p;
        }
    }
}
