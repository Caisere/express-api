import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string().min(10),
    NODE_ENV: z.enum(["development", "test", "production"]).default('development'),
    JWT_EXPIRES_IN: z.string().default('7d'),
    CREATOR_ID: z.string().optional(),
    PORT: z.coerce.number().positive().optional().default(3005)
});

const env = envSchema.parse(process.env);

export{env}