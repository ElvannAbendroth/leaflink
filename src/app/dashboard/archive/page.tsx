'use client'
import LinkCard from '@/components/LinkCard'
import { useLinks } from '@/lib/hooks/useLinks'

interface ArchivePageProps {}

export default function ArchivePage({}) {
  const { links, removeLink, updateLink } = useLinks()
  const archivedLinks = links?.filter(link => link.isArchived) || []
  return (
    <div className="">
      <h2 className="typo-h2">Archives</h2>
      <div>
        <div className="flex flex-col gap-4 mt-4">
          {archivedLinks?.length > 0 &&
            archivedLinks
              .sort((a, b) => b.clicks?.length - a.clicks?.length)
              .map(link => (
                <LinkCard key={link.id} link={link} removeLink={removeLink} updateLink={updateLink} type="archive" />
              ))}

          {archivedLinks.length === 0 && <p className="typo-p">There are no archived links yet!</p>}
        </div>
      </div>
    </div>
  )
}
