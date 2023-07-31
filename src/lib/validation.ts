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

// export const userRegisterSchema = z.object({
//   username: usernameSchema,
//   email: z.string().email('Invalid email format'),
//   password: z
//     .string()
//     .min(5, { message: 'Password must be 5 or more characters long' })
//     .max(20, { message: 'Password must be 20 or fewer characters long' }),
// })

export const linkSchema = z
  .object({
    title: z.string().max(140, { message: 'Title must be 140 characters of less.' }),
    href: z.string().url(),
  })
  .partial()

export const userSchema = z
  .object({
    username: z
      .string()
      .min(5, { message: 'Username must be 3 or more characters long' })
      .max(20, { message: 'Username must be 20 or fewer characters long' })
      .regex(/^[a-zA-Z0-9._-]{3,20}$/, { message: 'Username can only contain letters, numbers, _ and - or .' }),
    email: z.string().email('Invalid email format'),
    website: z.string().url(),
    imageUrl: z.string().url(),
    // socials: socialsSchema,
    // links: linkSchema.array(),
  })
  .partial()

// Username
// ^ asserts the start of the string.
// [a-zA-Z0-9._-] matches any alphanumeric character, period, underscore, or hyphen.
// {3,16} specifies the length range of the username, allowing 3 to 16 characters.
// $ asserts the end of the string.

export const usernamePattern = '/^[a-zA-Z0-9._-]{3,16}$/'

// Link Title
// ^ asserts the start of the string.
// [a-zA-Z0-9\s.,?!-] matches any alphanumeric character, whitespace, period, comma, question mark, or hyphen.
// {1,100} specifies the length range of the title, allowing 1 to 100 characters.
// $ asserts the end of the string.

export const linkTitlePattern = '/^[a-zA-Z0-9s.,?!-]{1,100}$/'

// URL
// ^ asserts the start of the string.
// https? matches "http" or "https" (the s is optional).
// :\/\/ matches the "://" part of the URL.
// ([\w-]+\.)+[\w]+ matches the domain name, allowing one or more groups of alphanumeric characters or hyphens followed by a period, and ending with one or more alphanumeric characters.
// (\/[\w-./?%&=]*)? matches the path of the URL, allowing zero or one occurrence of a forward slash followed by alphanumeric characters, hyphens, periods, question marks, percent signs, ampersands, or equal signs. This part is optional.
// $ asserts the end of the string.

export const linkUrlPattern = '/^https?://([w-]+.)+[w]+(/[w-./?%&=]*)?$/'
