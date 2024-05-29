import { Body, Controller, Get, Param, Patch, Query, Req } from "@nestjs/common";
import { Request } from "express";

import { UpdateMeDto } from "@repo/types";

import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    private defaultSearchLimit: number = 5;
    private maxSearchLimit: number = 15;

    constructor(private userService: UserService) {}

    @Get("@me")
    async findMe(@Req() req: Request) {
        const username = req["user"].login;
        return await this.userService.getUserByLogin(username);
    }

    @Get(":username")
    async findOne(@Param("username") username: string) {
        return await this.userService.getUserByLogin(username);
    }

    @Get("search/:input")
    async searchUsers(@Param("input") input: string, @Query("limit") limit: number) {
        if (!limit) {
            limit = this.defaultSearchLimit;
        }
        if (limit > this.maxSearchLimit) {
            limit = this.maxSearchLimit;
        }
        return await this.userService.searchUser(input.toLowerCase(), limit);
    }

    @Patch("@me")
    async updateMe(@Req() req: Request, @Body() userDto: UpdateMeDto) {
        const username = req["user"].login;
        return await this.userService.updateUser(username, userDto);
    }
}
