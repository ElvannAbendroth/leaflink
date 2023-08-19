/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Icons } from '@/components/Icons'
import { ProfilePicture } from '@/components/ProfilePicture'
import { UserContext } from '@/components/UserProvider'
import { Input } from '@/components/ui/Input'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { ChangeEventHandler, useCallback, useContext, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
import { Textarea } from '@/components/ui/Textarea'
import { request } from 'http'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { useSearchParams } from 'next/navigation'
import { ProfileTab } from './ProfileTab'

interface AppearancePageProps {}

export interface ProfileFormFields {
  username: string
  description: string
  website: string
  imageUrl: string
}

export default function AppearancePage({}) {
  const searchParams = useSearchParams()
  const { user, updateUser } = useContext(UserContext)
  const [formValues, setFormValues] = useState<ProfileFormFields | null>(null)

  const currentTab = searchParams.get('tab')
  const isActive = currentTab === 'Profile' || currentTab === null

  useEffect(() => {
    setFormValues(user as ProfileFormFields)
  }, [user])

  const request = debounce((formValues: ProfileFormFields) => updateUser(formValues), 3000)

  const debounceRequest = useCallback((formValues: ProfileFormFields) => request(formValues), [])

  if (!user || !formValues) return null

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
    const { name, value } = target
    const newFormValues = { ...formValues, [name]: value }
    setFormValues(newFormValues)
    debounceRequest(newFormValues)
  }

  return (
    <div className="mt-8 sm:mt-0">{isActive && <ProfileTab formValues={formValues} handleChange={handleChange} />}</div>
  )
}
