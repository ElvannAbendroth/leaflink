import { ProfileForm } from '@/components/ProfileForm'
import { getSessionUser, getUserById } from '@/lib/data.server'
import { UserDocument } from '@/lib/types'
import User from '@/models/userModel'

export default async function ProfilePage() {
  const sessionUser = await getSessionUser()
  if (!sessionUser.id) throw new Error('The is no user id in this session')

  let user
  if (sessionUser.id) {
    user = (await User.findById(sessionUser?.id).lean()) as UserDocument
  }
  if (!user) return new Error('error')

  return (
    <div className="">
      <h1 className="typo-h1">Profile Settings</h1>
      <p className="typo-p text-muted">Manage your public LeafLink page profile and links.</p>
      <ProfileForm user={user} />
    </div>
  )
}
