import * as z from "zod";

const ENV_SCHEMA = z
    .object({
        BACKEND_URL: z.string().url().default("http://localhost:3000"),
    })
    .passthrough()
    .readonly();

export const env = ENV_SCHEMA.parse(import.meta.env);
