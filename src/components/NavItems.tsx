// /* eslint-disable react-hooks/exhaustive-deps */
// 'use client'
// import Link from 'next/link'
// import { FC, useEffect, useState } from 'react'
// import { usePathname, useRouter } from 'next/navigation'
// import { Icons } from './Icons'
// import { siteConfig } from '@/lib/config'
// import { signOut, useSession } from 'next-auth/react'
// import { UserData } from '@/lib/types'

// interface NavItem {
//   label: string
//   href: string
// }

// interface NavItemsProps {
//   //username: string | undefined | null
// }

// export const NavItems: FC<NavItemsProps> = () => {
//   const pathname = usePathname()
//   //const router = useRouter()
//   const [showMobileMenu, setShowMobileMenu] = useState(false)
//   const [username, setUsername] = useState('')

//   const { data, status } = useSession()
//   const sessionUser = data?.user as UserData
//   //console.log('⭐Session User: ', data?.user)
//   //console.log('⭐Username: ', username)

//   useEffect(() => {
//     console.log('👋useEffect running')
//     if (status === 'authenticated' && sessionUser.id) {
//       fetch(`/api/users/${sessionUser.id}`)
//         .then(res => res.json())
//         .then(data => {
//           setUsername(data.username)
//         })
//         .catch(error => console.log('There was an error fetching this user: ', error))
//     }
//   }, [])

//   // If the user isn't authenticated, show a login button
//   if (status === 'unauthenticated')
//     return (
//       <Link href="/login" className="flex items-center">
//         <Icons.login className="cursor-pointer hover:text-foreground text-muted" size={16} strokeWidth={3} />
//       </Link>
//     )

//   const navItems: NavItem[] = [
//     { label: 'dashboard', href: '/dashboard' },
//     { label: 'profile', href: '/profile' },
//     // { label: 'preview', href: `/${username}` },
//     { label: username, href: `/${username}` },
//   ]

//   const mobileMenu = () => {
//     return (
//       <div className="fixed">
//         {showMobileMenu && (
//           <div className="bg-input fixed w-full top-0 bottom-0 left-0 py-6 px-8">
//             <div id="mobile-menu-header" className="flex justify-between items-start place-content-start mb-10">
//               <Link
//                 className="font-semibold text-2xl font-display hover:text-gray-800 flex gap-2 place-items-center"
//                 href="/"
//               >
//                 <Icons.logo strokeWidth={3} /> <span>{siteConfig.name}</span>
//               </Link>
//               <button onClick={e => setShowMobileMenu(!showMobileMenu)}>
//                 <Icons.close />
//               </button>
//             </div>
//             <div className="flex flex-col items-center gap-2">
//               {navItems.map(item => {
//                 return (
//                   <Link
//                     onClick={e => setShowMobileMenu(false)}
//                     key={`mobile-${item.label}`}
//                     href={item.href}
//                     className="text-foreground-faded hover:bg-muted/10 text-lg p-4 w-full text-center rounded-md font-semibold"
//                   >
//                     {item.label}
//                   </Link>
//                 )
//               })}
//               {status === 'authenticated' && (
//                 <a
//                   onClick={() => signOut()}
//                   className="text-foreground-faded hover:bg-muted/10 w-full p-4 text-lg text-center rounded-md flex gap-2 items-center place-content-center font-semibold"
//                 >
//                   <Icons.logout className="cursor-pointer " size={16} strokeWidth={3} />
//                   <span className="">Logout {username}</span>
//                 </a>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   }

//   return (
//     <div className="flex items-center">
//       <div id="desktop-nav-items" className="hidden sm:flex items-center gap-8">
//         {navItems.map(item => {
//           const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
//           return (
//             <Link
//               key={`desktop-${item.label}`}
//               className={`text-sm font-display lowercase font-semibold hover:underline underline-offset-4 decoration-2 hover:text-primary ${
//                 isActive ? 'underline text-foreground' : 'text-foreground-inactive'
//               }`}
//               href={item.href}
//               //onClick={() => router.refresh()}
//             >
//               {item.label}
//             </Link>
//           )
//         })}
//         <a onClick={() => signOut()}>
//           <Icons.logout
//             className="cursor-pointer text-foreground-inactive hover:text-primary"
//             size={20}
//             strokeWidth={2.5}
//           />
//         </a>
//       </div>

//       {mobileMenu()}

//       <button className="flex sm:hidden" onClick={e => setShowMobileMenu(!showMobileMenu)}>
//         <Icons.menu />
//       </button>
//     </div>
//   )
// }
