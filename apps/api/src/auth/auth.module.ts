import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";

import { EnvModule } from "src/env/env.module";
import { EnvService } from "src/env/env.service";
import { UserModule } from "src/user/user.module";

import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [EnvModule],
            inject: [EnvService],
            async useFactory(envService: EnvService) {
                return {
                    global: true,
                    secret: envService.get("API_JWT_SECRET"),
                    signOptions: { expiresIn: "1d" },
                };
            },
        }),
        EnvModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    exports: [AuthService],
})
export class AuthModule {}
