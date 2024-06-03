import { Logo } from './Logo'

export function Footer({}) {
  return (
    <footer className="p-8 pb-10 bg-foreground text-background">
      <div className="grid grid-cols-fit-24 gap-10 items-start md:justify-items-center">
        <Logo />
        <p className="typo-p text-sm text-center text-muted">
          Webapp created with NextJS 13, Tailwind & MongoDB by Oodri. Checkout the project on{' '}
          <a className="typo-a" href="https://github.com/ElvannAbendroth/leaflink" target="_blank">
            Github
          </a>
        </p>
      </div>
    </footer>
  )
}

// export function Footer({}) {
//   return (
//     <footer className="p-8 pb-10 ">
//       <p className="typo-p text-sm text-center text-muted">
//         Webapp created with NextJS 13, Tailwind & MongoDB by Oodri. Checkout the project on{' '}
//         <a className="typo-a" href="https://github.com/ElvannAbendroth/leaflink" target="_blank">
//           Github
//         </a>
//       </p>
//     </footer>
//   )
// }
