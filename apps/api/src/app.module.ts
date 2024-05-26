import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EnvModule } from "./env/env.module";
import { ENV_SCHEMA } from "./env/env.schema";
import { EnvService } from "./env/env.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: (env) => ENV_SCHEMA.parse(env),
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [EnvModule],
            inject: [EnvService],
            async useFactory(envService: EnvService) {
                return {
                    type: "mysql",
                    port: envService.get("API_MYSQL_PORT"),
                    host: envService.get("API_MYSQL_HOST"),
                    username: envService.get("API_MYSQL_USER"),
                    password: envService.get("API_MYSQL_PASSWORD"),
                    database: envService.get("API_MYSQL_DATABASE"),
                    entities: [],
                    synchronize: true,
                    autoLoadEntities: true,
                };
            },
        }),
        EnvModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
