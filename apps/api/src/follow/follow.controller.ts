import { Controller, Delete, HttpCode, Param, Post, Req } from "@nestjs/common";
import { Request } from "express";

import { FollowService } from "./follow.service";

@Controller("follow")
export class FollowController {
    constructor(private followService: FollowService) {}

    @Post(":username")
    @HttpCode(204)
    async followUser(@Req() req: Request, @Param("username") username: string) {
        const currentUsername = req["user"].login;
        return await this.followService.addFollow(currentUsername, username);
    }

    @Delete(":username")
    @HttpCode(204)
    async unFollowUser(@Req() req: Request, @Param("username") username: string) {
        const currentUsername = req["user"].login;
        return await this.followService.removeFollow(currentUsername, username);
    }
}
