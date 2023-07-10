import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import data from '@/lib/data'

export default function ProfilePage() {
  const { username, imageUrl, socials, website } = data
  return (
    <div className="">
      <h1 className="typo-h1">Profile Settings</h1>
      <p className="typo-p text-muted">Manage your public LeafLink page profile and links.</p>
      <form action="/dashboard" className="mt-14 flex flex-col gap-6">
        <div>
          <h2 className="typo-h2">User</h2>
        </div>

        <div className="relative">
          <label className="absolute top-0 py-4 px-8 text-muted flex gap-2" htmlFor="username">
            <Icons.logo /> leaf.link/
          </label>
          <Input className="pl-32" type="text" name="username" placeholder="username" value={username} />
        </div>

        <div className="relative">
          <label className="absolute top-0 py-4 px-8 text-muted" htmlFor="profile-image">
            <Icons.media />
          </label>
          <Input type="text" placeholder="Insert your profile image URL" name="profile-image" value={imageUrl} />
        </div>

        <div className="relative">
          <label className="absolute top-0 py-4 px-8 text-muted" htmlFor="profile-image">
            <Icons.link />
          </label>
          <Input
            type="text"
            placeholder="Insert URL for your profile username & image"
            name="profile-image"
            value={website}
          />
        </div>

        <h2 className="typo-h2">Socials</h2>

        <div className="relative">
          <label className="absolute top-0 py-4 px-8 text-muted" htmlFor="instagram">
            <Icons.instagram />
          </label>
          <Input type="text" placeholder="Insert your Instagram Link" name="instagram" value={socials?.instagram} />
        </div>

        <div className="relative">
          <label className="absolute top-0 py-4 px-8 text-muted" htmlFor="facebook">
            <Icons.facebook />
          </label>
          <Input type="text" placeholder="Insert your Facebook Link" name="facebook" value={socials?.facebook} />
        </div>

        <div className="relative">
          <label className="absolute top-0 py-4 px-8 text-muted" htmlFor="youtube">
            <Icons.youtube />
          </label>
          <Input type="text" placeholder="Insert your YouTube Link" name="youtube" value={socials?.youtube} />
        </div>

        <div className="relative">
          <label className="absolute top-0 py-4 px-8 text-muted" htmlFor="twitter">
            <Icons.twitter />
          </label>
          <Input type="text" placeholder="Insert your Twitter Link" name="twitter" value={socials?.twitter} />
        </div>

        <div className="relative">
          <label className="absolute top-0 py-4 px-8 text-muted" htmlFor="gitHub">
            <Icons.gitHub />
          </label>
          <Input type="text" placeholder="Insert your Github Link" name="gitHub" value={socials?.github} />
        </div>

        <div className="relative">
          <label className="absolute top-0 py-4 px-8 text-muted" htmlFor="instagram">
            <Icons.link />
          </label>
          <Input type="text" placeholder="Insert your Website Link" name="instagram" value={socials?.website} />
        </div>
        <Button className="mt-14">Save settings</Button>
      </form>
    </div>
  )
}
