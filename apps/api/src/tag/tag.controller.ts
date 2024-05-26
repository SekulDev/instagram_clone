import { Controller, Get, Param, Query } from "@nestjs/common";

import { TagService } from "./tag.service";

@Controller("tag")
export class TagController {
    private defaultTagLimit: number = 50;
    private maxTagLimit: number = 150;
    constructor(private tagService: TagService) {}

    @Get()
    async getMostPopular(@Query("limit") limit: number) {
        if (!limit) {
            limit = this.defaultTagLimit;
        }
        if (limit > this.maxTagLimit) {
            limit = this.maxTagLimit;
        }
        return await this.tagService.findMostPopular(limit);
    }

    @Get(":name")
    async getTag(@Param("name") name: string) {
        return await this.tagService.getTag(name.toLowerCase());
    }
}
