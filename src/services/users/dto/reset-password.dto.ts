import { z } from 'zod';

export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address')
});

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;

export type ResetPasswordResponse = {
  success: boolean;
  message: string;
};
