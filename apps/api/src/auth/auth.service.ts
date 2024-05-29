import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { EnvService } from "src/env/env.service";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    private readonly saltOrRounds = 10;
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private mailService: MailerService,
        private envService: EnvService,
    ) {}

    private async signJwtForUser(user: User): Promise<string> {
        const payload = { id: user.id, login: user.login, email: user.email };
        return await this.jwtService.signAsync(payload);
    }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmailOrLogin(username);
        if (!user) {
            throw new UnauthorizedException();
        }
        if (!(await bcrypt.compare(pass, user?.password))) {
            throw new UnauthorizedException();
        }
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

    async forgotPassword(email: string) {
        const uid = await this.usersService.createChangePasswordUrl(email);
        await this.mailService.sendMail({
            to: email,
            subject: "Instagram - zmiana hasła",
            template: "index",
            context: {
                content: `
                    Aby zmienić swoje hasło kliknij w ten <a href="${this.envService.get("VUE_URL")}/change-password/${uid}">link</a>!<br>
                    Jeśli ta wiadomość nie powinna trafić do ciebie - Usuń ją!
                `,
            },
        });
        return {
            id: uid,
        };
    }

    async changePassword(uid: string, password: string) {
        const hash = await bcrypt.hash(password, this.saltOrRounds);
        const email = await this.usersService.changeUserPassword(uid, hash);

        await this.mailService.sendMail({
            to: email,
            subject: "Instagram - hasło zmienione",
            template: "index",
            context: {
                content: `
                    Twoje hasło zostało pomyślnie zmienione. Odzyskałeś dostęp do swojego konta
                `,
            },
        });

        return;
    }
}
