import { User, UserCredentials, UserData } from "@/lib/types";

export const loggedUser : User = {
    id: '1',
    username: "elvann",
}

export const users : UserData[] = [
    {
        id: '1',
        username: "elvann",
        email: "elvann.mail@gmail.com",
        website: "http://www.oodri.dev",
        imageUrl: "https://avatars.githubusercontent.com/u/28565227?v=4",
        links: [
            {title: "My Store!", href: "http://www.elvannstore.com", isActive: true},
            {title: "My Website", href: "http://www.elvann.com", isActive: true},
            {title: "Latest Video", href: "https://www.youtube.com/channel/UCY3DEEgMSMvjww7v3aKDsig", isActive: true},
            {title: "Patreon Link", href: "http://patreon.com/elvann", isActive: false},
        ],
        socials: {
            github: "https://github.com/ElvannAbendroth",
            facebook: "https://www.facebook.com/elvannmusic",
            youtube: "https://www.youtube.com/@elvannmusic",
            instagram: "https://www.instagram.com/elvannmusic",
        }
    },
    {
        id: '2',
        username: "Enna",
        email: "info@shanna.com",
        website: "http://www.oodri.dev",
        imageUrl: "/images/profile-placeholder.png",
        links: [
            {title: "Check out Elco!", href: "http://www.elvannstore.com", isActive: true},
            {title: "My newest find!", href: "http://www.elvann.com", isActive: true},
            {title: "Waterdeep: Everything you need to know", href: "https://www.youtube.com/channel/UCY3DEEgMSMvjww7v3aKDsig", isActive: true},
        ],
        socials: {
            github: "https://github.com/ElvannAbendroth",
            twitter: "https://www.twitter.com/elvannmusic",
            youtube: "https://www.youtube.com/@elvannmusic",
            instagram: "https://www.instagram.com/elvannmusic",

        }
    }
]

export const userCredentials : UserCredentials = 
{  
    id: '1',
    username: "elvann", 
    password: "salainen"
}