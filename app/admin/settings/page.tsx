import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground">Manage system-wide configurations</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max-upload">Max Upload Size (MB)</Label>
                <Input id="max-upload" defaultValue="100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storage-limit">Storage Limit (GB)</Label>
                <Input id="storage-limit" defaultValue="1000" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-approve">Auto-approve uploads</Label>
              <Switch id="auto-approve" />
            </div>
            <Button>Save Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="registration">Allow new registrations</Label>
              <Switch id="registration" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-verify">Require email verification</Label>
              <Switch id="email-verify" defaultChecked />
            </div>
            <Button>Update User Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
