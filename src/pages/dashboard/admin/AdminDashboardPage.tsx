import { DashboardLayout } from "@/components/dashboard-layout";
import HelmetTitle from "@/components/layout/HelmetTitle";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGetAllTransactionsQuery } from "@/redux/api/transactionApi";
import { useGetAgentsQuery, useGetUsersQuery } from "@/redux/api/userApi";
import {
  Activity,
  AlertTriangle,
  Clock,
  Settings,
  Shield,
  TrendingUp,
  UserCheck,
  UserCheck2,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

// Mock recent admin activity data
const recentActivity = [
  {
    id: "1",
    type: "user_blocked",
    description: "Blocked user John Smith for suspicious activity",
    time: "5 minutes ago",
    severity: "high",
  },
  {
    id: "2",
    type: "agent_approved",
    description: "Approved new agent Sarah Johnson",
    time: "15 minutes ago",
    severity: "medium",
  },
  {
    id: "3",
    type: "system_update",
    description: "Updated transaction fee limits",
    time: "1 hour ago",
    severity: "low",
  },
  {
    id: "4",
    type: "large_transaction",
    description: "Large transaction flagged: $50,000",
    time: "2 hours ago",
    severity: "high",
  },
];

// Mock pending approvals
const pendingApprovals = [
  {
    id: "APP001",
    type: "agent_application",
    name: "Mike Chen",
    details: "Agent application for Mall Branch",
    time: "2 hours ago",
  },
  {
    id: "APP002",
    type: "user_verification",
    name: "Emma Davis",
    details: "Identity verification pending",
    time: "4 hours ago",
  },
  {
    id: "APP003",
    type: "transaction_review",
    name: "Large Transfer",
    details: "$25,000 transaction requires approval",
    time: "6 hours ago",
  },
];

// Mock system health metrics
const systemMetrics = [
  { label: "API Response Time", value: 95, status: "good" },
  { label: "Database Performance", value: 88, status: "good" },
  { label: "Transaction Success Rate", value: 99.8, status: "excellent" },
  { label: "System Uptime", value: 99.9, status: "excellent" },
];

export default function AdminDashboardPage() {
  const { data: agentsData, isLoading: agentsIsLoading } = useGetAgentsQuery();
  const { data: usersData, isLoading: usersIsLoading } = useGetUsersQuery();

  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userData");
  const user = JSON.parse(userInfo as string);
  useEffect(() => {
    if (localStorage.getItem("userRole") !== "ADMIN") {
      navigate("/");
    } else if (localStorage.getItem("isAuthenticated") !== "true") {
      navigate("/auth/login");
    }
  }, [navigate]);

  const { data: transactionsData } = useGetAllTransactionsQuery({});

  const transactions = Array.isArray(transactionsData?.data)
    ? transactionsData.data
    : [];

  console.log(transactions);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-orange-600 bg-orange-50";
      case "low":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_blocked":
        return <Shield className="h-4 w-4 text-red-600" />;
      case "agent_approved":
        return <UserCheck className="h-4 w-4 text-green-600" />;
      case "system_update":
        return <Settings className="h-4 w-4 text-blue-600" />;
      case "large_transaction":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <DashboardLayout
      userRole={user.role.toLowerCase()}
      userName={user.name}
      userEmail={user.email}
    >
      <HelmetTitle title="Admin Dashboard" />
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              System overview and management controls
            </p>
          </div>
          <div className="flex gap-2 sr-only">
            <Link to={"/dashboard/admin/users"}>
              <Button variant="outline" className="gap-2 bg-transparent">
                <TrendingUp className="h-4 w-4" />
                Analytics
              </Button>
            </Link>
            <Link to={"/dashboard/admin/settings"}>
              <Button className="gap-2">
                <Settings className="h-4 w-4" />
                System Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
              <div className="text-muted-foreground">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {usersIsLoading ? (
                  <NumberTicker
                    value={1011}
                    decimalPlaces={1}
                    className="whitespace-pre-wrap text-2xl font-bold tracking-tighter text-black dark:text-white"
                  />
                ) : (
                  usersData?.data?.length || 0
                )}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Badge
                  variant="secondary"
                  className={` text-green-500 text-xs`}
                >
                  Active users
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Agents
              </CardTitle>
              <div className="text-muted-foreground">
                <UserCheck2 className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {agentsIsLoading ? (
                  <NumberTicker
                    value={1011}
                    decimalPlaces={1}
                    className="whitespace-pre-wrap text-2xl font-bold tracking-tighter text-black dark:text-white"
                  />
                ) : (
                  agentsData?.data?.length || 0
                )}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Badge
                  variant="secondary"
                  className={` text-green-500 text-xs`}
                >
                  Active agents
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Pending Approvals */}
          <Card className="lg:col-span-1 sr-only">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending Approvals
              </CardTitle>
              <Badge variant="secondary">{pendingApprovals.length}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div
                  key={approval.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {approval.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{approval.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {approval.details}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {approval.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 px-2 text-xs bg-transparent"
                    >
                      Review
                    </Button>
                  </div>
                </div>
              ))}
              {pendingApprovals.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No pending approvals</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2 sr-only">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-muted">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${getSeverityColor(
                        activity.severity
                      )}`}
                    >
                      {activity.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <Card className="sr-only">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{metric.label}</span>
                    <span className="text-muted-foreground">
                      {metric.value}%
                    </span>
                  </div>
                  <Progress
                    value={metric.value}
                    className={`h-2 ${
                      metric.status === "excellent"
                        ? "text-green-600"
                        : metric.status === "good"
                        ? "text-blue-600"
                        : "text-orange-600"
                    }`}
                  />
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      metric.status === "excellent"
                        ? "bg-green-50 text-green-700"
                        : metric.status === "good"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-orange-50 text-orange-700"
                    }`}
                  >
                    {metric.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link to={"/dashboard/admin/users"}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold">Manage Users</h3>
                <p className="text-sm text-muted-foreground">
                  View and manage user accounts
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to={"/dashboard/admin/agents"}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold">Manage Agents</h3>
                <p className="text-sm text-muted-foreground">
                  Approve and manage agents
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to={"/dashboard/admin/transactions"}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold">Transactions</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor all transactions
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to={"/dashboard/admin/settings"}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow sr-only">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold">System Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure system parameters
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
