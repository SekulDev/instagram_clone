import * as z from "zod";

export const ENV_SCHEMA = z
    .object({
        API_PORT: z.coerce.number().default(3000),
        API_MYSQL_HOST: z.string(),
        API_MYSQL_PORT: z.coerce.number().default(3306),
        API_MYSQL_USER: z.string().default("root"),
        API_MYSQL_PASSWORD: z.string().default(""),
        API_MYSQL_DATABASE: z.string(),
    })
    .readonly();

export type Env = z.infer<typeof ENV_SCHEMA>;
