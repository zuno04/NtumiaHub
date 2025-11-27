'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface EmailPreference {
  id: string
  label: string
  description: string
  enabled: boolean
}

export function EmailPreferences() {
  const [preferences, setPreferences] = useState<EmailPreference[]>([
    {
      id: 'downloads',
      label: 'Download Notifications',
      description: 'Get notified when someone downloads your content',
      enabled: true
    },
    {
      id: 'uploads',
      label: 'Upload Confirmations',
      description: 'Receive confirmation emails for successful uploads',
      enabled: true
    },
    {
      id: 'team',
      label: 'Team Updates',
      description: 'Stay informed about team member activities',
      enabled: false
    },
    {
      id: 'marketing',
      label: 'Marketing Emails',
      description: 'Receive updates about new features and promotions',
      enabled: false
    }
  ])

  const togglePreference = (id: string) => {
    setPreferences(prev =>
      prev.map(pref =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {preferences.map((pref) => (
          <div key={pref.id} className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor={pref.id}>{pref.label}</Label>
              <p className="text-sm text-muted-foreground">{pref.description}</p>
            </div>
            <Switch
              id={pref.id}
              checked={pref.enabled}
              onCheckedChange={() => togglePreference(pref.id)}
            />
          </div>
        ))}
        <Button className="w-full">Save Preferences</Button>
      </CardContent>
    </Card>
  )
}
