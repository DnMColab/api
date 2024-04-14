import { z, ZodObject, ZodRawShape } from 'zod';

const dateFormat = /^(\d{4})-(\d{2})-(\d{2})$/;

export const ProfileCreateValidation: ZodObject<ZodRawShape> = z
  .object({
    profileName: z.string().min(3).max(32),
    bio: z.string().optional(),

    birthday: z.string().refine((value) => dateFormat.test(value), {
      message: "Birthday must be in 'yyyy-mm-dd' format",
    }),
  })
  .strict();

export const ProfileUpdateValidation: ZodObject<ZodRawShape> = z
  .object({
    profileName: z.string().min(3).max(32).optional(),
    bio: z.string().optional(),
    birthday: z
      .string()
      .refine((value) => dateFormat.test(value), {
        message: "Birthday must be in 'yyyy-mm-dd' format",
      })
      .optional(),
  })
  .strict();

export const ProfilesGetValidation: ZodObject<ZodRawShape> = z
  .object({
    where: z
      .object({
        profileName: z.object({
          contains: z.string().min(1).optional(),
          mode: z.enum(['insensitive']).optional(),
        }),
      })
      .optional(),
    orderBy: z
      .object({
        createdAt: z.enum(['asc', 'desc']).default('desc'),
      })
      .optional(),
    skip: z.number().default(0),
    take: z.number().default(50),
  })
  .strict();
