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
import {
  Search,
  Filter,
  Users,
  Shield,
  ShieldOff,
  Eye,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import {
  useApproveUserMutation,
  useGetUsersQuery,
  useSuspendUserMutation,
} from "@/redux/api/userApi";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { toast } from "sonner";
import SkeletonTable from "./skeletons/TabelSkeletons";

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [modelOpen, setModelOpen] = useState(false);
  const itemsPerPage = 10;

  const {
    data: usersData,
    refetch,
    isLoading: usersIsLoading,
  } = useGetUsersQuery();
  const [approveUser] = useApproveUserMutation();
  const [suspendUser] = useSuspendUserMutation();

  console.log(usersData);
  const users = Array.isArray(usersData?.data) ? usersData.data : [];
  // Filter users
  const filteredUsers = users?.filter(
    (user: {
      name: string;
      email: string;
      id: string;
      status: string;
      isActive: string;
    }) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        user.id?.toLowerCase().includes(searchQuery?.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;
      const matchesRisk = riskFilter === "all" || user.isActive === riskFilter;

      return matchesSearch && matchesStatus && matchesRisk;
    }
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "ACTIVE":
        return "bg-green-50 text-green-700";
      case "BLOCKED":
        return "bg-orange-50 text-orange-700";
      case "SUSPENDED":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const handleUserAction = (userId: string, action: string) => {
    if (action === "block") {
      console.log(userId);
      suspendUser(userId as string)
        .unwrap()
        .then(() => {
          toast.success("User blocked successfully");
          refetch();
          setModelOpen(false);
        })
        .catch(() => {
          toast.error("Failed to block user");
        });
    } else if (action === "unblock") {
      approveUser(userId as string)
        .unwrap()
        .then(() => {
          toast.success("User unblocked successfully");
          refetch();
          setModelOpen(false);
        })
        .catch(() => {
          toast.error("Failed to unblock user");
        });
    }
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
          <div className="flex gap-2 sr-only">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Users className="h-4 w-4" />
              Export Users
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">
                    {usersIsLoading ? (
                      <NumberTicker
                        value={1011}
                        decimalPlaces={1}
                        className="whitespace-pre-wrap text-2xl font-bold tracking-tighter text-black dark:text-white"
                      />
                    ) : (
                      users?.length || 0
                    )}
                  </p>
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
                    {usersIsLoading ? (
                      <NumberTicker
                        value={1011}
                        decimalPlaces={1}
                        className="whitespace-pre-wrap text-2xl font-bold tracking-tighter text-green-600 dark:text-white"
                      />
                    ) : (
                      users?.filter(
                        (u: { isActive: string }) => u.isActive === "ACTIVE"
                      )?.length
                    )}
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
                    {usersIsLoading ? (
                      <NumberTicker
                        value={1011}
                        decimalPlaces={1}
                        className="whitespace-pre-wrap text-2xl font-bold tracking-tighter text-red-600 dark:text-white"
                      />
                    ) : (
                      users?.filter((u) => u.isActive === "SUSPENDED")?.length
                    )}
                  </p>
                </div>
                <ShieldOff className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="sr-only">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Risk</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {/* {users?.filter((u: any) => u.riskLevel === "high")?.length} */}
                  </p>
                </div>
                <Filter className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="sr-only">
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

              {/* Risk Filter
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
              </Select> */}

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
            <CardTitle>
              Users (
              {usersIsLoading ? (
                <NumberTicker
                  value={1011}
                  decimalPlaces={1}
                  className="whitespace-pre-wrap  font-bold tracking-tighter text-black dark:text-white"
                />
              ) : (
                filteredUsers?.length
              )}
              )
            </CardTitle>
          </CardHeader>

          {usersIsLoading ? (
            <SkeletonTable />
          ) : (
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Contact Number</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers?.map((user: any) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                ?.map((n: any) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>

                            <p className="text-xs text-muted-foreground">
                              {user._id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium ">+88{user?.contact}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium ">{user?.email}</span>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {user.location || "Bangladesh"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={"capitalize"}>
                          {user.role?.toLowerCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={getRiskColor(user.isActive)}
                        >
                          {user.isActive}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog open={modelOpen} onOpenChange={setModelOpen}>
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
                                        {selectedUser._id}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">
                                        Phone
                                      </label>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedUser.contact}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">
                                        Join Date
                                      </label>
                                      <p className="text-sm text-muted-foreground">
                                        {format(
                                          new Date(selectedUser.createdAt),
                                          "MMM dd, yyyy"
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">
                                        Email
                                      </label>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedUser.email}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <div className="flex gap-2">
                                  {selectedUser?.isActive === "ACTIVE" ? (
                                    <Button
                                      variant="destructive"
                                      onClick={() =>
                                        handleUserAction(
                                          selectedUser._id as string,
                                          "block"
                                        )
                                      }
                                    >
                                      Block User
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleUserAction(
                                          selectedUser._id as string,
                                          "unblock"
                                        )
                                      }
                                    >
                                      Unblock User
                                    </Button>
                                  )}
                                  <Button
                                    variant="outline"
                                    onClick={() => setModelOpen(false)}
                                  >
                                    Close
                                  </Button>
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
                  {Math.min(startIndex + itemsPerPage, filteredUsers?.length)}{" "}
                  of {filteredUsers?.length} users
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
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
