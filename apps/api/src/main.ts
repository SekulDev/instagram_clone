import { NestFactory } from "@nestjs/core";
import { json } from "express";

import { AppModule } from "./app.module";
import { EnvService } from "./env/env.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE"],
            origin: "*",
        },
    });

    const envService = app.get(EnvService);
    const port = envService.get("API_PORT");

    app.use(json());

    await app.listen(port);
}
bootstrap();
