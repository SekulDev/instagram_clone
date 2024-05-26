import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { Request } from "express";

import { CreatePostDto } from "@repo/types";

import { PostService } from "./post.service";

@Controller("post")
export class PostController {
    constructor(private postService: PostService) {}

    @Post()
    async createPost(@Req() req: Request, @Body() postDto: CreatePostDto) {
        const username = req["user"].login;
        return await this.postService.create(username, postDto);
    }

    @Get("user/:user")
    async findByUser(@Param("user") username: string) {
        return await this.postService.findPostsByAuthor(username);
    }

    @Get(":id")
    async findOne(@Param("id") id: number) {
        return await this.postService.findOne(id);
    }
}
