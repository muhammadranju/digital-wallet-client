import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Phone,
  Mail,
  Lock,
  Bell,
  Shield,
  Camera,
  MapPin,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { useGetProfileQuery } from "@/redux/api/userApi";
import { format } from "date-fns";
import ProfileOverviewSkeletons from "../user/skeletons/ProfileOverviewSkeletons";
import ProfileSettingsSkeletons, {
  SettingsSkeletons,
} from "../user/skeletons/ProfileSettingsSkeletons";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { toast } from "sonner";

export default function AgentProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { data, isLoading } = useGetProfileQuery();
  const [changePassword, { isLoading: isChangePasswordLoading }] =
    useChangePasswordMutation();

  // Get user data from the API
  const user = data?.data;

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    transactionAlerts: true,
    commissionUpdates: true,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
  };

  const handelChangePassword = () => {
    changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    })
      .unwrap()
      .then(() => {
        toast.success("Password changed successfully");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch(() => {
        toast.error("Failed to change password");
      });
  };

  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agent Profile</h1>
          <p className="text-muted-foreground">
            Manage your agent account information and preferences
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Overview */}

          {isLoading ? (
            <ProfileOverviewSkeletons />
          ) : (
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Agent Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user?.image} alt="Profile" />
                      <AvatarFallback className="text-lg">
                        {user?.name}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-transparent"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">{user?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-2 bg-green-100 text-green-700"
                    >
                      {user?.verified ? "Active & Verified" : "Unverified"}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Agent ID</p>
                      <p className="text-sm text-muted-foreground">
                        {user?._id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {user?.location || "Bangladesh"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Agent since</p>
                      <p className="text-sm text-muted-foreground">
                        {format(user?.createdAt || 0, "MMMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <p className="text-sm text-green-600">
                        {user?.verified ? "Active & Verified" : "Unverified"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            {isLoading ? (
              <ProfileSettingsSkeletons />
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Personal Information</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-transparent sr-only"
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={user?.name.split(" ")[0]}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={user?.name.split(" ")[1]}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={user?.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        className="pl-10"
                        value={user?.contact}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Branch Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        className="pl-10"
                        value={user?.location || "Bangladesh"}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 pt-4">
                      <Button>Save Changes</Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Security Settings */}

            {isLoading ? (
              <SettingsSkeletons />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                      value={formData.currentPassword}
                      onChange={(e) =>
                        handleInputChange("currentPassword", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        value={formData.newPassword}
                        onChange={(e) =>
                          handleInputChange("newPassword", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <Button onClick={handelChangePassword}>
                    {isChangePasswordLoading
                      ? "Changing..."
                      : "Update Password"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Notification Preferences */}
            <Card className="sr-only">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(value) =>
                      handleNotificationChange("emailNotifications", value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via SMS
                    </p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(value) =>
                      handleNotificationChange("smsNotifications", value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications
                    </p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(value) =>
                      handleNotificationChange("pushNotifications", value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Transaction Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified of all transactions
                    </p>
                  </div>
                  <Switch
                    checked={notifications.transactionAlerts}
                    onCheckedChange={(value) =>
                      handleNotificationChange("transactionAlerts", value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Commission Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when commissions are paid
                    </p>
                  </div>
                  <Switch
                    checked={notifications.commissionUpdates}
                    onCheckedChange={(value) =>
                      handleNotificationChange("commissionUpdates", value)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
