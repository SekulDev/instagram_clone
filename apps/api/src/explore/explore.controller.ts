import { Controller, Get, Param, Query, Req } from "@nestjs/common";

import { ExploreService } from "./explore.service";

@Controller("explore")
export class ExploreController {
    private defaultLimit = 20;
    constructor(private exploreService: ExploreService) {}

    @Get()
    async explore(@Query("limit") limit: number, @Req() req: Request) {
        if (!limit) {
            limit = this.defaultLimit;
        }
        const userId = req["user"].id;
        return await this.exploreService.getRecommendedPosts(userId, limit);
    }

    @Get("tag/:tag")
    async exploreTag(@Param("tag") tag: string, @Query("limit") limit: number, @Req() req: Request) {
        if (!limit) {
            limit = this.defaultLimit;
        }
        const userId = req["user"].id;
        return await this.exploreService.getRecommendedPosts(userId, limit, tag.toLowerCase());
    }
}
