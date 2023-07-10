import Image from 'next/image'
import data from '@/lib/data'
import AddLinkForm from '@/components/AddLinkForm'
import LinkCardEdit from '@/components/LinkCardEdit'

export default function DashboardPage() {
  const { username, imageUrl, links } = data
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center">
        <Image className="rounded-full shadow-md" src={imageUrl} alt="profile picture" width={120} height={120} />
        <p className="typo-p font-display font-semibold text-lg text">@{username}</p>
      </div>
      <AddLinkForm />
      {links.map(link => (
        <LinkCardEdit key={link.href} link={link} />
      ))}
    </div>
  )
}
