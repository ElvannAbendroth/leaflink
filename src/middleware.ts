// Without a defined matcher, this one line applies next auth to the whole project
export { default } from 'next-auth/middleware'

// These routes require authentication
export const config = { matcher: ['/profile', '/dashboard'] }
