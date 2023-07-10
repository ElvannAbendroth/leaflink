import { User } from "@/lib/types";

export const data : User = {
    username: "elvann",
    email: "elvann.mail@gmail.com",
    imageUrl: "/images/profile-placeholder.png",
    links: [
        {title: "My Store!", href: "http://www.elvannstore.com"},
        {title: "My Website", href: "http://www.elvann.com"},
        {title: "Latest Video", href: "https://www.youtube.com/channel/UCY3DEEgMSMvjww7v3aKDsig"},
    ],
    socials: {
        github: "https://github.com/ElvannAbendroth",
        facebook: "https://www.facebook.com/elvannmusic",
        youtube: "https://www.youtube.com/channel/UCY3DEEgMSMvjww7v3aKDsig"

    }
}

export default data