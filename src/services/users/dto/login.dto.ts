import { z } from "zod";
import User from "../user";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginDto = z.infer<typeof loginSchema>;

export type LoginResponse = {
  user: User;
  accessToken: string;
  role: string;
};
