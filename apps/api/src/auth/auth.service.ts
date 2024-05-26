import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    private readonly saltOrRounds = 10;
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    private async signJwtForUser(user: User): Promise<string> {
        const payload = { id: user.id, login: user.login, email: user.email };
        return await this.jwtService.signAsync(payload);
    }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmailOrLogin(username);
        if (!(await bcrypt.compare(pass, user?.password))) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        const token = await this.signJwtForUser(user);
        return {
            access_token: token,
        };
    }

    async register(email: string, login: string, label: string, password: string) {
        const existingUser = await this.usersService.isUserExists(email, login);
        if (existingUser) {
            throw new UnauthorizedException();
        }
        const hash = await bcrypt.hash(password, this.saltOrRounds);
        const user = await this.usersService.createUser(email, login, label, hash);

        const token = await this.signJwtForUser(user);
        return {
            access_token: token,
        };
    }
}
