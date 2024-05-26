import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { Request } from "express";

import { CommentService } from "./comment.service";

@Controller("comment")
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Get("post/:id")
    async findByPost(@Param("id") id: number) {
        return await this.commentService.findForPost(id);
    }

    @Post("post/:id")
    async create(@Param("id") id: number, @Req() req: Request, @Body() dto: Record<string, any>) {
        const username = req["user"].login;
        return await this.commentService.create(username, id, dto);
    }
}
