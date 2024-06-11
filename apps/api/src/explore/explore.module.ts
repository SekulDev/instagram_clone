import { Module } from "@nestjs/common";

import { PostModule } from "src/post/post.module";

import { ExploreController } from "./explore.controller";
import { ExploreService } from "./explore.service";

@Module({
    controllers: [ExploreController],
    providers: [ExploreService],
    exports: [ExploreService],
    imports: [PostModule],
})
export class ExploreModule {}
