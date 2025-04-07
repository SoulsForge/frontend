import { z } from "zod";

const envSchema = z.object({
  BACKEND_SERVER: z.string().url(),
});

export const env = envSchema.parse({
  BACKEND_SERVER: process.env.PUBLIC_BACKEND_SERVER,
});
