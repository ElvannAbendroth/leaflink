import { ProfileForm } from '@/components/ProfileForm'

interface SettingsPageProps {}

export default function SettingsPage({}) {
  return (
    <div className="">
      <h2 className="typo-h2">Settings</h2>
      <h3 className="typo-h3">Account</h3>
      <ProfileForm />
    </div>
  )
}
