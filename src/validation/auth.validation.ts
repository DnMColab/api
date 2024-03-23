import { z, ZodObject, ZodRawShape } from 'zod';

export const AuthValidation: ZodObject<ZodRawShape> = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .strict();
