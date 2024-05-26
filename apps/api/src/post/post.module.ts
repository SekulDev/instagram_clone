import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TagModule } from "src/tag/tag.module";
import { UserModule } from "src/user/user.module";

import { PostController } from "./post.controller";
import { Post } from "./post.entity";
import { PostService } from "./post.service";

@Module({
    imports: [TagModule, UserModule, TypeOrmModule.forFeature([Post])],
    providers: [PostService],
    exports: [PostService],
    controllers: [PostController],
})
export class PostModule {}
