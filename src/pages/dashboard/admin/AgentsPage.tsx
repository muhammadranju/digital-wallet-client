/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardLayout } from "@/components/dashboard-layout";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
  useApproveUserMutation,
  useGetAgentsQuery,
  useSuspendUserMutation,
} from "@/redux/api/userApi";
import { format } from "date-fns";
import {
  Eye,
  Filter,
  MapPin,
  Search,
  Shield,
  ShieldOff,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import SkeletonTable from "./skeletons/TabelSkeletons";

export default function AdminAgentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [modelOpen, setModelOpen] = useState(false);
  const itemsPerPage = 10;

  const {
    data: agentsData,
    refetch,
    isLoading: agentsIsLoading,
  } = useGetAgentsQuery();
  const [approveUser] = useApproveUserMutation();
  const [suspendUser] = useSuspendUserMutation();

  console.log(agentsData);
  const agents = Array.isArray(agentsData?.data) ? agentsData.data : [];
  // Filter users
  const filteredAgents = agents?.filter(
    (agent: {
      name: string;
      email: string;
      id: string;
      status: string;
      isActive: string;
    }) => {
      const matchesSearch =
        agent.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        agent.email?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        agent.id?.toLowerCase().includes(searchQuery?.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || agent.status === statusFilter;
      const matchesRisk = riskFilter === "all" || agent.isActive === riskFilter;

      return matchesSearch && matchesStatus && matchesRisk;
    }
  );

  // Pagination
  const totalPages = Math.ceil(filteredAgents?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAgents = filteredAgents?.slice(
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

  const handleAgentAction = (agentId: string, action: string) => {
    if (action === "block") {
      console.log(agentId);
      suspendUser(agentId as string)
        .unwrap()
        .then(() => {
          toast.success("Agent blocked successfully");
          refetch();
          setModelOpen(false);
        })
        .catch(() => {
          toast.error("Failed to block agent");
        });
    } else if (action === "unblock") {
      approveUser(agentId as string)
        .unwrap()
        .then(() => {
          toast.success("Agent unblocked successfully");
          refetch();
          setModelOpen(false);
        })
        .catch(() => {
          toast.error("Failed to unblock agent");
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
              Agent Management
            </h1>
            <p className="text-muted-foreground">
              Approve, manage, and monitor agent performance
            </p>
          </div>
          <div className="flex gap-2 sr-only">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Users className="h-4 w-4" />
              Export Agents
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Agents</p>
                  <p className="text-2xl font-bold">
                    {agentsIsLoading ? (
                      <NumberTicker
                        value={1011}
                        decimalPlaces={1}
                        className="whitespace-pre-wrap text-2xl font-bold tracking-tighter text-black dark:text-white"
                      />
                    ) : (
                      agents?.length || 0
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
                  <p className="text-sm text-muted-foreground">Active Agent</p>
                  <p className="text-2xl font-bold text-green-600">
                    {agentsIsLoading ? (
                      <NumberTicker
                        value={1011}
                        decimalPlaces={1}
                        className="whitespace-pre-wrap text-2xl font-bold tracking-tighter text-green-600 dark:text-white"
                      />
                    ) : (
                      agents?.filter(
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
                  <p className="text-sm text-muted-foreground">Blocked Agent</p>
                  <p className="text-2xl font-bold text-red-600">
                    {agentsIsLoading ? (
                      <NumberTicker
                        value={1011}
                        decimalPlaces={1}
                        className="whitespace-pre-wrap text-2xl font-bold tracking-tighter text-red-600 dark:text-white"
                      />
                    ) : (
                      agents?.filter((u) => u.isActive === "SUSPENDED")?.length
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
                    {/* {Agent?.filter((u: any) => u.riskLevel === "high")?.length} */}
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

        {/* Agent Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Agents (
              {agentsIsLoading ? (
                <NumberTicker
                  value={1011}
                  decimalPlaces={1}
                  className="whitespace-pre-wrap  font-bold tracking-tighter text-black dark:text-white"
                />
              ) : (
                filteredAgents?.length
              )}
              )
            </CardTitle>
          </CardHeader>
          
          {agentsIsLoading ? (
            <SkeletonTable />
          ) : (
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Contact Number</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAgents?.map((agent: any) => (
                    <TableRow key={agent._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {agent.name
                                .split(" ")
                                ?.map((n: any) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{agent.name}</p>

                            <p className="text-xs text-muted-foreground">
                              {agent._id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium ">
                          +88{agent?.contact}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium ">{agent?.email}</span>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {agent.location || "Bangladesh"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={"capitalize"}>
                          {agent.role?.toLowerCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={getRiskColor(agent.isActive)}
                        >
                          {agent.isActive}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog open={modelOpen} onOpenChange={setModelOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedAgent(agent)}
                                className="bg-transparent"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>
                                  Agent Details - {selectedAgent?.name}
                                </DialogTitle>
                                <DialogDescription>
                                  View and manage agent account information
                                </DialogDescription>
                              </DialogHeader>
                              {selectedAgent && (
                                <div className="space-y-4">
                                  <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                      <label className="text-sm font-medium">
                                        Agent ID
                                      </label>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedAgent._id}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">
                                        Phone
                                      </label>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedAgent.contact}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">
                                        Join Date
                                      </label>
                                      <p className="text-sm text-muted-foreground">
                                        {format(
                                          new Date(selectedAgent.createdAt),
                                          "MMM dd, yyyy"
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">
                                        Email
                                      </label>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedAgent.email}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <div className="flex gap-2">
                                  {selectedAgent?.isActive === "ACTIVE" ? (
                                    <Button
                                      variant="destructive"
                                      onClick={() =>
                                        handleAgentAction(
                                          selectedAgent._id as string,
                                          "block"
                                        )
                                      }
                                    >
                                      Block Agent
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleAgentAction(
                                          selectedAgent._id as string,
                                          "unblock"
                                        )
                                      }
                                    >
                                      Unblock Agent
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
                  {Math.min(startIndex + itemsPerPage, filteredAgents?.length)}{" "}
                  of {filteredAgents?.length} agents
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
