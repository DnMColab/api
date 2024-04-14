import { z, ZodObject, ZodRawShape } from 'zod';

export const NoteCreateValidation: ZodObject<ZodRawShape> = z
  .object({
    body: z.string().min(16).max(1024),

    parentId: z.string().optional(),

    tags: z.array(z.string().min(3)).optional(),
  })
  .strict();

export const NoteUpdateValidation: ZodObject<ZodRawShape> = z
  .object({
    body: z.string().min(16).max(1024).optional(),

    tags: z.array(z.string().min(3)).optional(),
  })
  .strict();
