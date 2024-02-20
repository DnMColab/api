import { z, ZodObject, ZodRawShape } from 'zod';

export const ProfileCreateValidation: ZodObject<ZodRawShape> = z.object({
  profileName: z.string().min(3),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  country: z.string().min(3),
});

export const ProfileUpdateValidation: ZodObject<ZodRawShape> = z.object({
  profileName: z.string().min(3).optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  country: z.string().min(3).optional(),
});
