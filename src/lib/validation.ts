import { z } from 'zod'

export const usernameSchema = z
  .string()
  .min(5, { message: 'Username must be 3 or more characters long' })
  .max(20, { message: 'Username must be 20 or fewer characters long' })
  .regex(/^[a-zA-Z0-9._-]{3,20}$/, { message: 'Username can only contain letters, numbers, _ and - or .' })

export const socialsSchema = z
  .object({
    instagram: z.string().url(),
    facebook: z.string().url(),
    youtube: z.string().url(),
    twitter: z.string().url(),
    github: z.string().url(),
    website: z.string().url(),
  })
  .partial()

export const linkSchema = z
  .object({
    title: z.string().max(140, { message: 'Title must be 140 characters of less.' }),
    href: z.string().url(),
  })
  .partial()

//TODO: Fix Social Validation

export const userSchema = z
  .object({
    username: usernameSchema,
    email: z.string().email('Invalid email format'),
    website: z.string().url('Invalid Website URL'),
    imageUrl: z.string().url('Invalid Image URL'),
    //socials: socialsSchema,
    links: linkSchema.array(),
  })
  .partial()

export const userRegisterSchema = z.object({
  username: usernameSchema,
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(5, { message: 'Password must be 5 or more characters long' })
    .max(20, { message: 'Password must be 20 or fewer characters long' }),
})
