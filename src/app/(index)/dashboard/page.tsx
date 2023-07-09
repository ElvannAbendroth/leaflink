import { Icons } from '@/components/Icons'
import Image from 'next/image'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center">
        <Image
          className="rounded-full shadow-md"
          src="/images/profile-placeholder.png"
          alt="profile picture"
          width={120}
          height={120}
        />
        <p className="typo-p font-display font-semibold text-lg text">@username</p>
      </div>
      <form action="" id="add-link-card" className="flex flex-col gap-4 border-border border-2 rounded-lg p-8">
        <input
          className="bg-input flex gap-3 rounded-full  py-3 px-6 items-center justify-center self-stretch placeholder:text-muted w-full focus-visible:outline-primary"
          type="text"
          placeholder="Link Title"
        />
        <input
          className="bg-input flex gap-3 rounded-full  py-3 px-6 items-center justify-center self-stretch placeholder:text-muted w-full focus-visible:outline-primary"
          type="text"
          placeholder="Link Title"
        />
        <button className="flex gap-2 bg-primary rounded-full py-3 px-6 justify-center items-center self-stretch text-primary-foreground w-full hover:bg-primary-hover">
          <Icons.add size={20} /> Add link
        </button>
      </form>
      <div id="link-card" className="bg-input flex gap-4 rounded-lg p-8 items-end ">
        <div className="flex flex-col gap-4 flex-grow">
          <p className="typo-h4 flex gap-2 items-center cursor-pointer">
            Link Title
            <Icons.pen size={16} />
          </p>
          <p className="text-muted flex gap-2 items-center cursor-pointer">
            http://www.yourwebsite.com
            <Icons.pen size={16} />
          </p>
        </div>

        <Icons.trash className="cursor-pointer" size={16} />
      </div>

      <div id="link-card" className="bg-input flex gap-4 rounded-lg p-8 items-end ">
        <div className="flex flex-col gap-4 flex-grow">
          {' '}
          <p className="typo-h4 flex gap-2 items-center cursor-pointer">
            Link Title
            <Icons.pen size={16} />
          </p>
          <p className="text-muted flex gap-2 items-center cursor-pointer">
            http://www.yourwebsite.com
            <Icons.pen size={16} />
          </p>
        </div>

        <Icons.trash className="cursor-pointer" size={16} />
      </div>
    </div>
  )
}
