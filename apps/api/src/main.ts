import { NestFactory } from "@nestjs/core";
import * as express from "express";
import { join } from "path";

import { AppModule } from "./app.module";
import { EnvService } from "./env/env.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            origin: "http://localhost:5173",
        },
    });

    app.use("/upload", express.static(join(process.cwd(), "upload")));

    app.setGlobalPrefix("api");

    const envService = app.get(EnvService);
    const port = envService.get("API_PORT");

    app.use(express.json());

    await app.listen(port);
}
bootstrap();
