import { Body, Controller, Get, Param, Patch, Req } from "@nestjs/common";
import { Request } from "express";

import { UserService } from "./user.service";

@Controller("user")
export class UserController {
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

    @Patch("@me")
    async updateMe(@Req() req: Request, @Body() userDto: Record<string, any>) {
        const username = req["user"].login;
        return await this.userService.updateUser(username, userDto);
    }
}
