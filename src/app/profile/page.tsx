import { ProfileForm } from '@/components/ProfileForm'
import { getSessionUser, getUserById } from '@/lib/data.server'

export default async function ProfilePage() {
  const sessionUser = await getSessionUser()
  if (!sessionUser.id) throw new Error('The is no user id in this session')

  const user = await getUserById(sessionUser?.id)

  return (
    <div className="">
      <h1 className="typo-h1">Profile Settings</h1>
      <p className="typo-p text-muted">Manage your public LeafLink page profile and links.</p>
      <ProfileForm user={user} />
    </div>
  )
}
