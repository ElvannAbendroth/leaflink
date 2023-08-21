/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { UserContext } from '@/components/UserProvider'
import { ChangeEventHandler, useCallback, useContext, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
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

export default function AppearancePage({}) {
  const searchParams = useSearchParams()
  const { user, updateUser } = useContext(UserContext)
  const [formValues, setFormValues] = useState<ProfileFormFields | null>(null)

  const currentTab = searchParams.get('tab')

  useEffect(() => {
    setFormValues(user as ProfileFormFields)
  }, [user])

  const request = debounce((formValues: ProfileFormFields) => updateUser(formValues), 3000)

  const debounceRequest = useCallback((formValues: ProfileFormFields) => request(formValues), [])

  if (!user || !formValues) return null

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
    const { name, value } = target
    const newFormValues = { ...formValues, [name]: value || '' }
    setFormValues(newFormValues)
    debounceRequest(newFormValues)
  }
  const handleChangeSocials: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    const newFormValues = { ...formValues, socials: { ...formValues.socials, [name]: value || '' } }
    setFormValues(newFormValues)
    debounceRequest(newFormValues)
  }

  return (
    <div className="mt-8 sm:mt-0">
      {(currentTab === 'Profile' || currentTab === null) && (
        <ProfileTab formValues={formValues} handleChange={handleChange} />
      )}
      {currentTab === 'Social' && <SocialTab socials={formValues.socials} handleChangeSocials={handleChangeSocials} />}
      {currentTab === 'Theme' && <ThemeTab />}
    </div>
  )
}
