import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Settings, DollarSign, Shield, Bell, Activity } from "lucide-react"
import { useState } from "react"

export default function AdminSettingsPage() {
  const [systemSettings, setSystemSettings] = useState({
    // Transaction Fees
    transferFee: "1.0",
    cashInFee: "1.0",
    cashOutFee: "1.0",
    withdrawalFee: "2.0",

    // Transaction Limits
    dailyTransferLimit: "10000",
    singleTransactionLimit: "5000",
    monthlyLimit: "50000",

    // System Configuration
    maintenanceMode: false,
    newUserRegistration: true,
    agentRegistration: true,
    autoApproveAgents: false,

    // Security Settings
    twoFactorRequired: false,
    sessionTimeout: "30",
    maxLoginAttempts: "5",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    adminAlerts: true,
    highRiskAlerts: true,
  })

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSystemSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = () => {
    console.log("[v0] Saving system settings:", systemSettings)
    // Handle saving settings here
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
            <p className="text-muted-foreground">Configure system parameters and limits</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-transparent">
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSettings}>Save Changes</Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Transaction Fees */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Transaction Fees
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="transferFee">Transfer Fee (%)</Label>
                <Input
                  id="transferFee"
                  value={systemSettings.transferFee}
                  onChange={(e) => handleSettingChange("transferFee", e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Fee for user-to-user transfers</p>
              </div>

              <div>
                <Label htmlFor="cashInFee">Cash In Fee (%)</Label>
                <Input
                  id="cashInFee"
                  value={systemSettings.cashInFee}
                  onChange={(e) => handleSettingChange("cashInFee", e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Fee for agent cash deposits</p>
              </div>

              <div>
                <Label htmlFor="cashOutFee">Cash Out Fee (%)</Label>
                <Input
                  id="cashOutFee"
                  value={systemSettings.cashOutFee}
                  onChange={(e) => handleSettingChange("cashOutFee", e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Fee for agent cash withdrawals</p>
              </div>

              <div>
                <Label htmlFor="withdrawalFee">Withdrawal Fee (%)</Label>
                <Input
                  id="withdrawalFee"
                  value={systemSettings.withdrawalFee}
                  onChange={(e) => handleSettingChange("withdrawalFee", e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Fee for bank withdrawals</p>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Limits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Transaction Limits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="dailyTransferLimit">Daily Transfer Limit ($)</Label>
                <Input
                  id="dailyTransferLimit"
                  value={systemSettings.dailyTransferLimit}
                  onChange={(e) => handleSettingChange("dailyTransferLimit", e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Maximum daily transfer amount per user</p>
              </div>

              <div>
                <Label htmlFor="singleTransactionLimit">Single Transaction Limit ($)</Label>
                <Input
                  id="singleTransactionLimit"
                  value={systemSettings.singleTransactionLimit}
                  onChange={(e) => handleSettingChange("singleTransactionLimit", e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Maximum amount per transaction</p>
              </div>

              <div>
                <Label htmlFor="monthlyLimit">Monthly Limit ($)</Label>
                <Input
                  id="monthlyLimit"
                  value={systemSettings.monthlyLimit}
                  onChange={(e) => handleSettingChange("monthlyLimit", e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Maximum monthly transaction volume per user</p>
              </div>
            </CardContent>
          </Card>

          {/* System Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">Disable system for maintenance</p>
                </div>
                <Switch
                  checked={systemSettings.maintenanceMode}
                  onCheckedChange={(value) => handleSettingChange("maintenanceMode", value)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New User Registration</p>
                  <p className="text-sm text-muted-foreground">Allow new users to register</p>
                </div>
                <Switch
                  checked={systemSettings.newUserRegistration}
                  onCheckedChange={(value) => handleSettingChange("newUserRegistration", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Agent Registration</p>
                  <p className="text-sm text-muted-foreground">Allow new agent applications</p>
                </div>
                <Switch
                  checked={systemSettings.agentRegistration}
                  onCheckedChange={(value) => handleSettingChange("agentRegistration", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-Approve Agents</p>
                  <p className="text-sm text-muted-foreground">Automatically approve agent applications</p>
                </div>
                <Switch
                  checked={systemSettings.autoApproveAgents}
                  onCheckedChange={(value) => handleSettingChange("autoApproveAgents", value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                </div>
                <Switch
                  checked={systemSettings.twoFactorRequired}
                  onCheckedChange={(value) => handleSettingChange("twoFactorRequired", value)}
                />
              </div>

              <Separator />

              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  value={systemSettings.sessionTimeout}
                  onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Auto-logout inactive users</p>
              </div>

              <div>
                <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                <Input
                  id="maxLoginAttempts"
                  value={systemSettings.maxLoginAttempts}
                  onChange={(e) => handleSettingChange("maxLoginAttempts", e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Lock account after failed attempts</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Send system notifications via email</p>
                </div>
                <Switch
                  checked={systemSettings.emailNotifications}
                  onCheckedChange={(value) => handleSettingChange("emailNotifications", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">Send critical alerts via SMS</p>
                </div>
                <Switch
                  checked={systemSettings.smsNotifications}
                  onCheckedChange={(value) => handleSettingChange("smsNotifications", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Admin Alerts</p>
                  <p className="text-sm text-muted-foreground">Notify admins of system events</p>
                </div>
                <Switch
                  checked={systemSettings.adminAlerts}
                  onCheckedChange={(value) => handleSettingChange("adminAlerts", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">High Risk Alerts</p>
                  <p className="text-sm text-muted-foreground">Alert on high-risk transactions</p>
                </div>
                <Switch
                  checked={systemSettings.highRiskAlerts}
                  onCheckedChange={(value) => handleSettingChange("highRiskAlerts", value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Database</p>
                  <p className="text-sm text-muted-foreground">Connection status</p>
                </div>
                <Badge className="bg-green-50 text-green-700">Online</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Payment Gateway</p>
                  <p className="text-sm text-muted-foreground">Service status</p>
                </div>
                <Badge className="bg-green-50 text-green-700">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">SMS Service</p>
                  <p className="text-sm text-muted-foreground">Notification service</p>
                </div>
                <Badge className="bg-green-50 text-green-700">Running</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
