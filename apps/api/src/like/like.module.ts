import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PostModule } from "src/post/post.module";
import { UserModule } from "src/user/user.module";

import { LikeController } from "./like.controller";
import { Like } from "./like.entity";
import { LikeService } from "./like.service";

@Module({
    imports: [UserModule, PostModule, TypeOrmModule.forFeature([Like])],
    providers: [LikeService],
    controllers: [LikeController],
})
export class LikeModule {}
