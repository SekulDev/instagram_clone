import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserModule } from "src/user/user.module";

import { FollowController } from "./follow.controller";
import { Follow } from "./follow.entity";
import { FollowService } from "./follow.service";

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([Follow])],
    providers: [FollowService],
    exports: [FollowService],
    controllers: [FollowController],
})
export class FollowModule {}
