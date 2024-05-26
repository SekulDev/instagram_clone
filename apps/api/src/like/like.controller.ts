import { Controller, Delete, HttpCode, Param, Post, Req } from "@nestjs/common";

import { LikeService } from "./like.service";

@Controller("like")
export class LikeController {
    constructor(private likeService: LikeService) {}

    @Post(":post")
    @HttpCode(204)
    async followUser(@Req() req: Request, @Param("post") post: number) {
        const username = req["user"].login;
        return await this.likeService.addLike(username, post);
    }

    @Delete(":post")
    @HttpCode(204)
    async unFollowUser(@Req() req: Request, @Param("post") post: number) {
        const username = req["user"].login;
        return await this.likeService.removeLike(username, post);
    }
}
