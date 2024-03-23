import { z, ZodObject, ZodRawShape } from 'zod';

export const NoteCreateValidation: ZodObject<ZodRawShape> = z
  .object({
    body: z.string().min(3),

    parentId: z.string().optional(),

    tags: z.array(z.string()).optional(),
  })
  .strict();

export const NoteUpdateValidation: ZodObject<ZodRawShape> = z
  .object({
    body: z.string().min(3).optional(),

    parentId: z.string().optional(),

    tags: z.array(z.string()).optional(),
  })
  .strict();
