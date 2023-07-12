import { ProfileForm } from '@/components/ProfileForm'

export default function ProfilePage() {
  return (
    <div className="">
      <h1 className="typo-h1">Profile Settings</h1>
      <p className="typo-p text-muted">Manage your public LeafLink page profile and links.</p>
      <ProfileForm />
    </div>
  )
}
