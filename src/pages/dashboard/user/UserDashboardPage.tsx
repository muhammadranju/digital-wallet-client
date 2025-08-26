import { DashboardLayout } from "@/components/dashboard-layout";
import { StatCard, userStats } from "@/components/dashboard-stats";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Plus,
  Send,
} from "lucide-react";
// import { useAuth } from "@/components/auth-provider";

// Mock recent transactions data
const recentTransactions = [
  {
    id: "1",
    type: "received",
    amount: "+$250.00",
    description: "Payment from Sarah Johnson",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: "2",
    type: "sent",
    amount: "-$89.50",
    description: "Coffee Shop Payment",
    time: "5 hours ago",
    status: "completed",
  },
  {
    id: "3",
    type: "received",
    amount: "+$1,200.00",
    description: "Salary Deposit",
    time: "1 day ago",
    status: "completed",
  },
  {
    id: "4",
    type: "sent",
    amount: "-$45.00",
    description: "Uber Ride",
    time: "2 days ago",
    status: "pending",
  },
];

export default function UserDashboardPage() {


  return (
    <DashboardLayout userRole={"user"}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, John!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your account today.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Money
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Quick Actions & Recent Transactions */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start gap-3" size="lg">
                <Send className="h-5 w-5" />
                Send Money
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-transparent"
                size="lg"
              >
                <Download className="h-5 w-5" />
                Request Money
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-transparent"
                size="lg"
              >
                <Plus className="h-5 w-5" />
                Add Money
              </Button>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.type === "received"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.type === "received" ? (
                          <ArrowDownRight className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium text-sm ${
                          transaction.type === "received"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.amount}
                      </p>
                      <Badge
                        variant={
                          transaction.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
