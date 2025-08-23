
import { DashboardLayout } from "@/components/dashboard-layout";
import { StatCard, agentStats } from "@/components/dashboard-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Plus,
  Minus,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router";

// Mock recent agent activity data
const recentActivity = [
  {
    id: "1",
    type: "cash-in",
    user: "Sarah Johnson",
    amount: "+$500.00",
    commission: "$5.00",
    time: "10 minutes ago",
    status: "completed",
  },
  {
    id: "2",
    type: "cash-out",
    user: "Mike Chen",
    amount: "-$250.00",
    commission: "$2.50",
    time: "25 minutes ago",
    status: "completed",
  },
  {
    id: "3",
    type: "cash-in",
    user: "Emma Davis",
    amount: "+$1,200.00",
    commission: "$12.00",
    time: "1 hour ago",
    status: "pending",
  },
  {
    id: "4",
    type: "cash-out",
    user: "John Smith",
    amount: "-$75.00",
    commission: "$0.75",
    time: "2 hours ago",
    status: "completed",
  },
];

// Mock pending requests
const pendingRequests = [
  {
    id: "REQ001",
    user: "Alice Brown",
    type: "deposit",
    amount: "$300.00",
    requestTime: "5 minutes ago",
  },
  {
    id: "REQ002",
    user: "Bob Wilson",
    type: "withdrawal",
    amount: "$150.00",
    requestTime: "12 minutes ago",
  },
];

export default function AgentDashboardPage() {
  return (
    <DashboardLayout
      userRole="agent"
      userName="Agent Smith"
      userEmail="agent@example.com"
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Agent Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage cash operations and track your performance
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <TrendingUp className="h-4 w-4" />
              View Reports
            </Button>
            <Button className="gap-2">
              <Users className="h-4 w-4" />
              Serve Customer
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {agentStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Pending Requests */}
          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending Requests
              </CardTitle>
              <Badge variant="secondary">{pendingRequests.length}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {request.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{request.user}</p>
                      <p className="text-xs text-muted-foreground">
                        {request.type} • {request.requestTime}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{request.amount}</p>
                    <div className="flex gap-1 mt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 px-2 text-xs bg-transparent"
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {pendingRequests.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No pending requests</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2">
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
                      <div
                        className={`p-2 rounded-full ${
                          activity.type === "cash-in"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {activity.type === "cash-in" ? (
                          <Plus className="h-4 w-4" />
                        ) : (
                          <Minus className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {activity.type === "cash-in" ? "Cash In" : "Cash Out"}{" "}
                          - {activity.user}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Commission: {activity.commission} • {activity.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium text-sm ${
                          activity.type === "cash-in"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {activity.amount}
                      </p>
                      <Badge
                        variant={
                          activity.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link to={"/dashboard/agent/cash-operations"}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold">Cash In</h3>
                <p className="text-sm text-muted-foreground">
                  Add money to user wallet
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to={"/dashboard/agent/cash-operations"}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Minus className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold">Cash Out</h3>
                <p className="text-sm text-muted-foreground">
                  Withdraw from user wallet
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to={"/dashboard/agent/commission"}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold">Commission</h3>
                <p className="text-sm text-muted-foreground">
                  View earnings history
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to={"/dashboard/agent/transactions"}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold">Transactions</h3>
                <p className="text-sm text-muted-foreground">
                  View all transactions
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
