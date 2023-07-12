// wo a defined matcher, this one line applies next auth to the whole project
export {default} from "next-auth/middleware"


//only certian routes
export const config = {matcher: ["/profile", "/dashboard"]}