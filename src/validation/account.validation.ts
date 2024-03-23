import { z, ZodObject, ZodRawShape } from 'zod';

// deny registration from these domains
const blockedDomains = [
  'mail.ru',
  'yandex.ru',
  'list.ru',
  'bk.ru',
  'inbox.ru',
  'tut.by',
  'mail.by',
];

export const AccountCreateValidation: ZodObject<ZodRawShape> = z
  .object({
    email: z
      .string()
      .email()
      .refine(
        (email) => {
          const domain = email.split('@')[1];
          return !blockedDomains.includes(domain);
        },
        {
          message: 'Registration from this domain is not allowed.',
        },
      ),
    password: z.string().min(8),
    username: z.string().min(3),
  })
  .strict();

export const AccountUpdateValidation: ZodObject<ZodRawShape> = z
  .object({
    username: z.string().min(3).optional(),
  })
  .strict();
