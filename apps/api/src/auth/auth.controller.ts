import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

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
}
