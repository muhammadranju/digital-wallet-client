/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Filter, UserCheck, UserX, Eye, MapPin, DollarSign } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"

// Mock agent data
const agents = [
  {
    id: "AGT001",
    name: "Agent Smith",
    email: "agent.smith@example.com",
    phone: "+1234567890",
    location: "Downtown Branch",
    status: "active",
    joinDate: "2024-01-10",
    lastActivity: "2024-01-20",
    transactionCount: 156,
    totalCommission: 1245.5,
    rating: 4.8,
  },
  {
    id: "AGT002",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1234567891",
    location: "Mall Branch",
    status: "pending",
    joinDate: "2024-01-18",
    lastActivity: "2024-01-19",
    transactionCount: 0,
    totalCommission: 0,
    rating: 0,
  },
  {
    id: "AGT003",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1234567892",
    location: "Airport Terminal",
    status: "active",
    joinDate: "2024-01-05",
    lastActivity: "2024-01-20",
    transactionCount: 234,
    totalCommission: 2890.75,
    rating: 4.9,
  },
  {
    id: "AGT004",
    name: "Emma Davis",
    email: "emma.davis@example.com",
    phone: "+1234567893",
    location: "Shopping Center",
    status: "suspended",
    joinDate: "2024-01-12",
    lastActivity: "2024-01-17",
    transactionCount: 89,
    totalCommission: 567.25,
    rating: 4.2,
  },
  {
    id: "AGT005",
    name: "John Brown",
    email: "john.brown@example.com",
    phone: "+1234567894",
    location: "Downtown Branch",
    status: "active",
    joinDate: "2024-01-08",
    lastActivity: "2024-01-19",
    transactionCount: 178,
    totalCommission: 1678.9,
    rating: 4.7,
  },
]

export default function AdminAgentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const itemsPerPage = 10

  // Filter agents
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || agent.status === statusFilter
    const matchesLocation = locationFilter === "all" || agent.location === locationFilter

    return matchesSearch && matchesStatus && matchesLocation
  })

  // Pagination
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAgents = filteredAgents.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700"
      case "pending":
        return "bg-orange-50 text-orange-700"
      case "suspended":
        return "bg-red-50 text-red-700"
      default:
        return "bg-gray-50 text-gray-700"
    }
  }

  const handleAgentAction = (agentId: string, action: string) => {
    console.log(`[v0] ${action} agent ${agentId}`)
    // Handle agent actions here
  }

  // Get unique locations for filter
  const locations = [...new Set(agents.map((agent) => agent.location))]

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agent Management</h1>
            <p className="text-muted-foreground">Approve, manage, and monitor agent performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <UserCheck className="h-4 w-4" />
              Export Agents
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Agents</p>
                  <p className="text-2xl font-bold">{agents.length}</p>
                </div>
                <UserCheck className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Agents</p>
                  <p className="text-2xl font-bold text-green-600">
                    {agents.filter((a) => a.status === "active").length}
                  </p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Approval</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {agents.filter((a) => a.status === "pending").length}
                  </p>
                </div>
                <UserX className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Commission</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${agents.reduce((sum, a) => sum + a.totalCommission, 0).toFixed(2)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
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
                  placeholder="Search agents..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setStatusFilter("all")
                  setLocationFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Agents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Agents ({filteredAgents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Transactions</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {agent.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-sm text-muted-foreground">{agent.email}</p>
                          <p className="text-xs text-muted-foreground">{agent.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{agent.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{agent.transactionCount}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">${agent.totalCommission.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{agent.rating > 0 ? agent.rating.toFixed(1) : "N/A"}</span>
                        {agent.rating > 0 && <span className="text-yellow-500">★</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
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
                              <DialogTitle>Agent Details - {selectedAgent?.name}</DialogTitle>
                              <DialogDescription>View and manage agent account information</DialogDescription>
                            </DialogHeader>
                            {selectedAgent && (
                              <div className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div>
                                    <label className="text-sm font-medium">Agent ID</label>
                                    <p className="text-sm text-muted-foreground">{selectedAgent.id}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Phone</label>
                                    <p className="text-sm text-muted-foreground">{selectedAgent.phone}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Join Date</label>
                                    <p className="text-sm text-muted-foreground">
                                      {format(new Date(selectedAgent.joinDate), "MMM dd, yyyy")}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Last Activity</label>
                                    <p className="text-sm text-muted-foreground">
                                      {format(new Date(selectedAgent.lastActivity), "MMM dd, yyyy")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <div className="flex gap-2">
                                {selectedAgent?.status === "pending" && (
                                  <Button onClick={() => handleAgentAction(selectedAgent.id, "approve")}>
                                    Approve Agent
                                  </Button>
                                )}
                                {selectedAgent?.status === "active" ? (
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleAgentAction(selectedAgent.id, "suspend")}
                                  >
                                    Suspend Agent
                                  </Button>
                                ) : (
                                  selectedAgent?.status === "suspended" && (
                                    <Button onClick={() => handleAgentAction(selectedAgent.id, "activate")}>
                                      Activate Agent
                                    </Button>
                                  )
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
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAgents.length)} of{" "}
                {filteredAgents.length} agents
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
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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
  )
}
