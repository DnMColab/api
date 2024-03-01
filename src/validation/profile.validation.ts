import { z, ZodObject, ZodRawShape } from 'zod';

const dateFormat = /^(\d{4})-(\d{2})-(\d{2})$/;

export const ProfileCreateValidation: ZodObject<ZodRawShape> = z.object({
  profileName: z.string().min(3),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  country: z.string().min(3),
  birthday: z.string().refine((value) => dateFormat.test(value), {
    message: "Birthday must be in 'yyyy-mm-dd' format",
  }),
});

export const ProfileUpdateValidation: ZodObject<ZodRawShape> = z.object({
  profileName: z.string().min(3).optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  country: z.string().min(3).optional(),
});
