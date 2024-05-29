import { Body, Controller, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";

import { Public } from "./auth.public";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    @Public()
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post("register")
    @Public()
    register(@Body() registerDto: Record<string, any>) {
        return this.authService.register(registerDto.email, registerDto.login, registerDto.label, registerDto.password);
    }

    @Post("forgot-password")
    @Public()
    async forgotPassword(@Body() dto: { email: string }) {
        return await this.authService.forgotPassword(dto.email);
    }

    @Put("change-password/:uid")
    @HttpCode(204)
    @Public()
    async changePassword(@Body() dto: { password: string }, @Param("uid") uid: string) {
        return await this.authService.changePassword(uid, dto.password);
    }
}
