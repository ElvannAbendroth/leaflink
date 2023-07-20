import { ProfileForm } from '@/components/ProfileForm'
import { getSessionUser, getUserById } from '@/lib/data.server'
import { UserDocument } from '@/lib/types'
import User from '@/models/userModel'

export default async function ProfilePage() {
  // const sessionUser = await getSessionUser()
  // const user = await getUserById(sessionUser.id)

  return (
    <div className="">
      <h1 className="typo-h1">Profile Settings</h1>
      <p className="typo-p text-muted">Manage your public LeafLink page profile and links.</p>
      <ProfileForm />
    </div>
  )
}
