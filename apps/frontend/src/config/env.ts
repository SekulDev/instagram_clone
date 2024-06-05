import * as z from "zod";

const ENV_SCHEMA = z
    .object({
        BACKEND_URL: z.string().url().default("http://localhost:3000"),
        FRONTEND_URL: z.string().url().default("http://localhost:5173"),
    })
    .passthrough()
    .readonly();

export const env = ENV_SCHEMA.parse(import.meta.env);
