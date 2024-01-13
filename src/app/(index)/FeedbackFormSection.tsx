/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tzoQHp32L7t
 */
'use client'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Icons } from '@/components/Icons'
import { InputGroup } from '@/components/ui/InputGroup'

export default function FeedbackFormSection() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="typo-h1">Feedback Form</h2>
        <p className="typo-p text-muted">We value your feedback and suggestions. Please fill out the form below.</p>
      </div>
      <div className="space-y-4">
        <InputGroup className="space-y-2">
          <Label htmlFor="name">
            <Icons.user />
          </Label>
          <Input id="name" placeholder="Enter your name" required />
        </InputGroup>
        <InputGroup className="space-y-2">
          <Label htmlFor="email">
            <Icons.email />
          </Label>
          <Input id="email" placeholder="Enter your email" required type="email" />
        </InputGroup>
        <div className="space-y-2">
          <Label htmlFor="feedback-type">Feedback Type</Label>
          <Select name="feedback-type">
            <SelectTrigger>
              <SelectValue placeholder="Select feedback type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Feedback</SelectItem>
              <SelectItem value="feature">Feature Request</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <InputGroup className="space-y-2">
          <Label htmlFor="feedback">
            <Icons.title />
          </Label>
          <Textarea name="feedback" placeholder="Enter your feedback or feature request" required />
        </InputGroup>
        <Button className="w-full" type="submit">
          Submit Feedback
        </Button>
      </div>
    </div>
  )
}
