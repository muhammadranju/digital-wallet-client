/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Filter, Users, Shield, ShieldOff, Eye } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

// Mock user data
const users = [
  {
    id: "USR001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    balance: 2450.0,
    status: "active",
    joinDate: "2024-01-15",
    lastActivity: "2024-01-20",
    transactionCount: 45,
    riskLevel: "low",
  },
  {
    id: "USR002",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1234567891",
    balance: 1250.0,
    status: "active",
    joinDate: "2024-01-10",
    lastActivity: "2024-01-19",
    transactionCount: 23,
    riskLevel: "low",
  },
  {
    id: "USR003",
    name: "Mike Chen",
    email: "mike@example.com",
    phone: "+1234567892",
    balance: 890.5,
    status: "blocked",
    joinDate: "2024-01-05",
    lastActivity: "2024-01-18",
    transactionCount: 67,
    riskLevel: "high",
  },
  {
    id: "USR004",
    name: "Emma Davis",
    email: "emma@example.com",
    phone: "+1234567893",
    balance: 3200.0,
    status: "active",
    joinDate: "2024-01-12",
    lastActivity: "2024-01-20",
    transactionCount: 89,
    riskLevel: "medium",
  },
  {
    id: "USR005",
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+1234567894",
    balance: 150.0,
    status: "suspended",
    joinDate: "2024-01-08",
    lastActivity: "2024-01-17",
    transactionCount: 12,
    riskLevel: "medium",
  },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const itemsPerPage = 10;

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesRisk = riskFilter === "all" || user.riskLevel === riskFilter;

    return matchesSearch && matchesStatus && matchesRisk;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700";
      case "blocked":
        return "bg-red-50 text-red-700";
      case "suspended":
        return "bg-orange-50 text-orange-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-50 text-green-700";
      case "medium":
        return "bg-orange-50 text-orange-700";
      case "high":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const handleUserAction = (userId: string, action: string) => {
    console.log(`[v0] ${action} user ${userId}`);
    // Handle user actions here
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              User Management
            </h1>
            <p className="text-muted-foreground">
              View and manage all user accounts
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Users className="h-4 w-4" />
              Export Users
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-green-600">
                    {users.filter((u) => u.status === "active").length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Blocked Users</p>
                  <p className="text-2xl font-bold text-red-600">
                    {users.filter((u) => u.status === "blocked").length}
                  </p>
                </div>
                <ShieldOff className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Risk</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {users.filter((u) => u.riskLevel === "high").length}
                  </p>
                </div>
                <Filter className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>

              {/* Risk Filter */}
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setRiskFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Transactions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        ${user.balance.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{user.transactionCount}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(user.status)}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={getRiskColor(user.riskLevel)}
                      >
                        {user.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {format(new Date(user.lastActivity), "MMM dd, yyyy")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                              className="bg-transparent"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>
                                User Details - {selectedUser?.name}
                              </DialogTitle>
                              <DialogDescription>
                                View and manage user account information
                              </DialogDescription>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div>
                                    <label className="text-sm font-medium">
                                      User ID
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedUser.id}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">
                                      Phone
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedUser.phone}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">
                                      Join Date
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {format(
                                        new Date(selectedUser.joinDate),
                                        "MMM dd, yyyy"
                                      )}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">
                                      Transaction Count
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedUser.transactionCount}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <div className="flex gap-2">
                                {selectedUser?.status === "active" ? (
                                  <Button
                                    variant="destructive"
                                    onClick={() =>
                                      handleUserAction(selectedUser.id, "block")
                                    }
                                  >
                                    Block User
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() =>
                                      handleUserAction(
                                        selectedUser.id,
                                        "unblock"
                                      )
                                    }
                                  >
                                    Unblock User
                                  </Button>
                                )}
                                <Button variant="outline">Close</Button>
                              </div>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length} users
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
