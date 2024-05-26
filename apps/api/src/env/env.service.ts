import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import type { Env } from "./env.schema";

@Injectable()
export class EnvService {
    public constructor(private readonly configService: ConfigService) {}

    get<T extends keyof Env>(key: T): Env[T] {
        return this.configService.get(key, { infer: true });
    }
}
