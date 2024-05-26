import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PostModule } from "src/post/post.module";
import { UserModule } from "src/user/user.module";

import { CommentController } from "./comment.controller";
import { Comment } from "./comment.entity";
import { CommentService } from "./comment.service";

@Module({
    imports: [UserModule, PostModule, TypeOrmModule.forFeature([Comment])],
    providers: [CommentService],
    controllers: [CommentController],
})
export class CommentModule {}
