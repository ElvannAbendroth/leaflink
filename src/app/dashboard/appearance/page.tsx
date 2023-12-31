'use client'
import { UserContext } from '@/components/UserProvider'
import { ChangeEventHandler, useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProfileTab } from './ProfileTab'
import { SocialTab } from './SocialTab'
import { Social } from '@/lib/types'
import { ThemeTab } from './ThemeTab'

interface AppearancePageProps {}

export interface ProfileFormFields {
  username: string
  description: string
  website: string
  imageUrl: string
  socials: Social
}

export default function AppearancePage({}: AppearancePageProps) {
  const searchParams = useSearchParams()
  const { user, updateUser } = useContext(UserContext)
  const [formValues, setFormValues] = useState<ProfileFormFields | null>(null)

  const currentTab = searchParams.get('tab')

  useEffect(() => {
    setFormValues(user as ProfileFormFields)
  }, [user])

  if (!user || !formValues) return null

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
    const { name, value } = target
    const newFormValues = { ...formValues, [name]: value || '' }
    setFormValues(newFormValues)
    updateUser(newFormValues)
  }
  const handleChangeSocials: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    const newFormValues = { ...formValues, socials: { ...formValues.socials, [name]: value || '' } }
    setFormValues(newFormValues)
    updateUser(newFormValues)
  }

  return (
    <div className="">
      {(currentTab === 'Profile' || currentTab === null) && (
        <ProfileTab formValues={formValues} handleChange={handleChange} />
      )}
      {currentTab === 'Social' && <SocialTab socials={formValues.socials} handleChangeSocials={handleChangeSocials} />}
      {currentTab === 'Theme' && <ThemeTab />}
    </div>
  )
}
