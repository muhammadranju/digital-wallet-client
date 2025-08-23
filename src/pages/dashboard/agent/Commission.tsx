import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Download,
  Plus,
  Minus,
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

// Mock commission data
const commissionHistory = [
  {
    id: "COM001",
    date: "2024-01-15",
    type: "cash-in",
    user: "Sarah Johnson",
    transactionAmount: 500.0,
    commissionRate: 1.0,
    commissionEarned: 5.0,
    status: "paid",
  },
  {
    id: "COM002",
    date: "2024-01-15",
    type: "cash-out",
    user: "Mike Chen",
    transactionAmount: 250.0,
    commissionRate: 1.0,
    commissionEarned: 2.5,
    status: "paid",
  },
  {
    id: "COM003",
    date: "2024-01-14",
    type: "cash-in",
    user: "Emma Davis",
    transactionAmount: 1200.0,
    commissionRate: 1.0,
    commissionEarned: 12.0,
    status: "pending",
  },
  {
    id: "COM004",
    date: "2024-01-13",
    type: "cash-out",
    user: "John Smith",
    transactionAmount: 75.0,
    commissionRate: 1.0,
    commissionEarned: 0.75,
    status: "paid",
  },
  {
    id: "COM005",
    date: "2024-01-12",
    type: "cash-in",
    user: "Alice Brown",
    transactionAmount: 300.0,
    commissionRate: 1.0,
    commissionEarned: 3.0,
    status: "paid",
  },
];

export default function CommissionPage() {
  const [periodFilter, setPeriodFilter] = useState("this-month");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter commission data
  const filteredCommissions = commissionHistory.filter((commission) => {
    const matchesStatus =
      statusFilter === "all" || commission.status === statusFilter;
    // Add period filtering logic here based on periodFilter
    return matchesStatus;
  });

  // Calculate totals
  const totalEarned = filteredCommissions.reduce(
    (sum, c) => sum + c.commissionEarned,
    0
  );
  const paidCommissions = filteredCommissions.filter(
    (c) => c.status === "paid"
  );
  const pendingCommissions = filteredCommissions.filter(
    (c) => c.status === "pending"
  );
  const totalPaid = paidCommissions.reduce(
    (sum, c) => sum + c.commissionEarned,
    0
  );
  const totalPending = pendingCommissions.reduce(
    (sum, c) => sum + c.commissionEarned,
    0
  );

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "cash-in":
        return <Plus className="h-4 w-4 text-green-600" />;
      case "cash-out":
        return <Minus className="h-4 w-4 text-red-600" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Commission History
            </h1>
            <p className="text-muted-foreground">
              Track your earnings and commission payments
            </p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Commission Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Earned</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${totalEarned.toFixed(2)}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Paid</p>
                  <p className="text-2xl font-bold">${totalPaid.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">
                    ${totalPending.toFixed(2)}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Rate</p>
                  <p className="text-2xl font-bold">1.0%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Time Period
                </label>
                <Select value={periodFilter} onValueChange={setPeriodFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Commission History Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Commission History ({filteredCommissions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Transaction Amount</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommissions.map((commission) => (
                  <TableRow key={commission.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-muted">
                          {getTransactionIcon(commission.type)}
                        </div>
                        <div>
                          <p className="font-medium capitalize">
                            {commission.type.replace("-", " ")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {commission.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{commission.user}</p>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        ${commission.transactionAmount.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {commission.commissionRate}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">
                        ${commission.commissionEarned.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {format(new Date(commission.date), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          commission.status === "paid" ? "default" : "secondary"
                        }
                      >
                        {commission.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
