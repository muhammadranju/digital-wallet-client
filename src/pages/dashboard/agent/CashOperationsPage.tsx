/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Minus, Search, Clock } from "lucide-react"
import { useState } from "react"

export default function CashOperationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cashInAmount, setCashInAmount] = useState("")
  const [cashOutAmount, setCashOutAmount] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)

  // Mock user search results
  const searchResults = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1234567890",
      balance: 1250.0,
      status: "active",
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike@example.com",
      phone: "+1234567891",
      balance: 890.5,
      status: "active",
    },
    {
      id: "3",
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "+1234567892",
      balance: 2100.0,
      status: "active",
    },
  ]

  const filteredResults = searchResults.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery),
  )

  // Mock recent operations
  const recentOperations = [
    {
      id: "OP001",
      type: "cash-in",
      user: "Sarah Johnson",
      amount: 500.0,
      commission: 5.0,
      time: "10 minutes ago",
      status: "completed",
    },
    {
      id: "OP002",
      type: "cash-out",
      user: "Mike Chen",
      amount: 250.0,
      commission: 2.5,
      time: "25 minutes ago",
      status: "completed",
    },
    {
      id: "OP003",
      type: "cash-in",
      user: "Emma Davis",
      amount: 1200.0,
      commission: 12.0,
      time: "1 hour ago",
      status: "pending",
    },
  ]

  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cash Operations</h1>
          <p className="text-muted-foreground">Manage cash deposits and withdrawals for users</p>
        </div>

        {/* User Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Find User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or phone number"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Search Results */}
              {searchQuery && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredResults.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer"
                      onClick={() => {
                        setSelectedUser(user)
                        setSearchQuery("")
                      }}
                    >
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
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">{user.phone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${user.balance.toFixed(2)}</p>
                        <Badge variant="secondary">{user.status}</Badge>
                      </div>
                    </div>
                  ))}
                  {filteredResults.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">No users found</p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Selected User & Operations */}
        {selectedUser && (
          <Card>
            <CardHeader>
              <CardTitle>Selected User</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {selectedUser.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                    <p className="text-sm text-muted-foreground">{selectedUser.phone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Current Balance</p>
                  <p className="text-2xl font-bold">${selectedUser.balance.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Cash In */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="h-20 flex-col gap-2">
                      <Plus className="h-6 w-6" />
                      Cash In
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cash In - {selectedUser.name}</DialogTitle>
                      <DialogDescription>Add money to user's wallet</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cash-in-amount">Amount</Label>
                        <Input
                          id="cash-in-amount"
                          placeholder="Enter amount"
                          value={cashInAmount}
                          onChange={(e) => setCashInAmount(e.target.value)}
                        />
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span>Amount:</span>
                          <span>${cashInAmount || "0.00"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Commission (1%):</span>
                          <span>${cashInAmount ? (Number.parseFloat(cashInAmount) * 0.01).toFixed(2) : "0.00"}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-medium">
                          <span>User receives:</span>
                          <span>${cashInAmount || "0.00"}</span>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Process Cash In</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Cash Out */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Minus className="h-6 w-6" />
                      Cash Out
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cash Out - {selectedUser.name}</DialogTitle>
                      <DialogDescription>Withdraw money from user's wallet</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cash-out-amount">Amount</Label>
                        <Input
                          id="cash-out-amount"
                          placeholder="Enter amount"
                          value={cashOutAmount}
                          onChange={(e) => setCashOutAmount(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Available: ${selectedUser.balance.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span>Amount:</span>
                          <span>${cashOutAmount || "0.00"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Commission (1%):</span>
                          <span>${cashOutAmount ? (Number.parseFloat(cashOutAmount) * 0.01).toFixed(2) : "0.00"}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-medium">
                          <span>Cash to give:</span>
                          <span>${cashOutAmount || "0.00"}</span>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Process Cash Out</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOperations.map((operation) => (
                <div key={operation.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        operation.type === "cash-in" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {operation.type === "cash-in" ? <Plus className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium">
                        {operation.type === "cash-in" ? "Cash In" : "Cash Out"} - {operation.user}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {operation.id} • {operation.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${operation.amount.toFixed(2)}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600">+${operation.commission.toFixed(2)}</span>
                      <Badge variant={operation.status === "completed" ? "default" : "secondary"}>
                        {operation.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
