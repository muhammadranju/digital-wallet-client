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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { countAmount } from "@/lib/countAmount";
import {
  useCashInMutation,
  useCashOutMutation,
  useGetMyTransactionsQuery,
} from "@/redux/api/transactionApi";
import { useGetUsersQuery } from "@/redux/api/userApi";
import { useGetBalanceQuery } from "@/redux/api/walletApi";
import { Minus, Plus, Search, TrendingUp, TrendingUpIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CashOperationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cashInAmount, setCashInAmount] = useState("");
  const [cashOutAmount, setCashOutAmount] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [cashInModelOpen, setCashInModelOpen] = useState(false);
  const [cashOutModelOpen, setCashOutModelOpen] = useState(false);

  const { data, refetch, isLoading } = useGetBalanceQuery();
  const { data: userData } = useGetUsersQuery();
  const users = Array.isArray(userData?.data) ? userData.data : [];
  const { data: transactionData, isLoading: transactionIsLoading } =
    useGetMyTransactionsQuery({});
  const balance = data?.data;
  const { totalCashInAmount, totalCashOutAmount } =
    countAmount(transactionData);

  const [cashIn, { isLoading: isCashInLoading }] = useCashInMutation();

  const [cashOut, { isLoading: isCashOutLoading }] = useCashOutMutation();

  const filteredResults = users.filter(
    (user: any) =>
      user.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      user.contact.includes(searchQuery)
  );
  // Mock recent operations
  // const recentOperations = [
  //   {
  //     id: "OP001",
  //     type: "cash-in",
  //     user: "Sarah Johnson",
  //     amount: 500.0,
  //     commission: 5.0,
  //     time: "10 minutes ago",
  //     status: "completed",
  //   },
  //   {
  //     id: "OP002",
  //     type: "cash-out",
  //     user: "Mike Chen",
  //     amount: 250.0,
  //     commission: 2.5,
  //     time: "25 minutes ago",
  //     status: "completed",
  //   },
  //   {
  //     id: "OP003",
  //     type: "cash-in",
  //     user: "Emma Davis",
  //     amount: 1200.0,
  //     commission: 12.0,
  //     time: "1 hour ago",
  //     status: "pending",
  //   },
  // ];

  const handelCashIn = () => {
    cashIn({ receiverId: selectedUser._id, amount: parseFloat(cashInAmount) })
      .unwrap()
      .then(() => {
        toast.success("Cash In successful");
        setCashInAmount("");
        refetch();
        // setOpen(false);

        setCashInModelOpen(false);
      })
      .catch((error) => {
        toast.warning(error.data.message || "Failed to make the cash out");
      });
  };

  const handelCashOut = () => {
    cashOut({ receiverId: selectedUser._id, amount: parseFloat(cashOutAmount) })
      .unwrap()
      .then(() => {
        toast.success("Cash Out successful");
        setCashOutAmount("");
        refetch();
        setCashOutModelOpen(false);
      })
      .catch((error) => {
        toast.warning(error.data.message || "Failed to make the cash out");
      });
  };

  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Cash Operations
          </h1>
          <p className="text-muted-foreground">
            Manage cash deposits and withdrawals for users
          </p>
        </div>
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Available Balance
            </CardTitle>
            <div className="text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">
              $
              {isLoading ? (
                <NumberTicker
                  value={10001}
                  decimalPlaces={1}
                  className="whitespace-pre-wrap text-4xl font-bold tracking-tighter text-black dark:text-white"
                />
              ) : (
                balance?.balance
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center w-full gap-5">
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cash In
              </CardTitle>
              <div className="text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                $
                {transactionIsLoading ? (
                  <NumberTicker
                    value={120}
                    decimalPlaces={1}
                    className="whitespace-pre-wrap text-2xl font-bold tracking-tighter text-black dark:text-white"
                  />
                ) : (
                  totalCashInAmount || 0
                )}
              </div>
              {/* {change && ( */}
              <div className="flex items-center gap-1 mt-1 sr-only">
                <Badge
                  variant="secondary"
                  className={` text-green-500 text-xs`}
                >
                  <TrendingUpIcon className="h-3 w-3 mr-1" />
                  +15.3%
                </Badge>
              </div>
              {/* )} */}
              {/* {description && ( */}
              <p className="text-xs text-muted-foreground mt-1">
                Total cash deposits
              </p>
              {/* )} */}
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cash In Out
              </CardTitle>
              <div className="text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                $
                {transactionIsLoading ? (
                  <NumberTicker
                    value={120}
                    decimalPlaces={1}
                    className="whitespace-pre-wrap text-2xl font-bold tracking-tighter text-black dark:text-white"
                  />
                ) : (
                  totalCashOutAmount || 0
                )}
              </div>
              {/* {change && ( */}
              <div className="flex items-center gap-1 mt-1 sr-only">
                <Badge variant="secondary" className={`text-green-500 text-xs`}>
                  <TrendingUpIcon className="h-3 w-3 mr-1" />
                  +15.3%
                </Badge>
              </div>
              {/* )} */}
              {/* {description && ( */}
              <p className="text-xs text-muted-foreground mt-1">
                Total withdrawals
              </p>
              {/* )} */}
            </CardContent>
          </Card>
        </div>
        {/* User Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Find User to Cash In or Cash Out
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
                  {filteredResults.map((user: any) => (
                    <div
                      key={user._id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer"
                      onClick={() => {
                        setSelectedUser(user);
                        setSearchQuery("");
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n: any) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            +88{user.contact}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {/* <p className="font-medium">${user.balance || 0}</p> */}
                        <Badge variant="secondary">
                          {user.status || "Active"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {filteredResults.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No users found
                    </p>
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
                    <h3 className="text-lg font-semibold">
                      {selectedUser.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedUser.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      +88{selectedUser.contact}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Cash In */}
                <Dialog
                  open={cashInModelOpen}
                  onOpenChange={setCashInModelOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="h-20 flex-col gap-2">
                      <Plus className="h-6 w-6" />
                      Cash In
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cash In - {selectedUser.name}</DialogTitle>
                      <DialogDescription>
                        Add money to user's wallet
                      </DialogDescription>
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
                          <span>${cashInAmount}</span>
                        </div>
                        {/* <div className="flex justify-between text-sm">
                          <span>Commission (1%):</span>
                          <span>
                            $
                            {cashInAmount
                              ? Number.parseFloat(cashInAmount) * 0.01
                              : "0.00"}
                          </span>
                        </div> */}
                        <Separator className="my-2" />
                        <div className="flex justify-between font-medium">
                          <span>User receives:</span>
                          <span>${cashInAmount}</span>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setCashInModelOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handelCashIn}>
                        {isCashInLoading ? "Processing..." : "Process Cash In"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Cash Out */}
                <Dialog
                  open={cashOutModelOpen}
                  onOpenChange={setCashOutModelOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-20 flex-col gap-2 bg-transparent"
                    >
                      <Minus className="h-6 w-6" />
                      Cash Out
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cash Out - {selectedUser.name}</DialogTitle>
                      <DialogDescription>
                        Withdraw money from user's wallet
                      </DialogDescription>
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
                          Available: ${selectedUser.balance}
                        </p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span>Amount:</span>
                          <span>${cashOutAmount}</span>
                        </div>
                        {/* <div className="flex justify-between text-sm">
                          <span>Commission (1%):</span>
                          <span>
                            $
                            {cashOutAmount
                              ? Number.parseFloat(cashOutAmount) * 0.01
                              : "0.00"}
                          </span>
                        </div> */}
                        <Separator className="my-2" />
                        <div className="flex justify-between font-medium">
                          <span>Cash to give:</span>
                          <span>${cashOutAmount}</span>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setCashOutModelOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handelCashOut}>
                        {isCashOutLoading
                          ? "Processing..."
                          : "Process Cash Out"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Operations */}
        {/* <Card className="sr-only">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOperations.map((operation, idx) => (
                <div
                  key={operation._id || idx}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        operation.type === "cash-in"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {operation.type === "cash-in" ? (
                        <Plus className="h-4 w-4" />
                      ) : (
                        <Minus className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {operation.type === "cash-in" ? "Cash In" : "Cash Out"}{" "}
                        - {operation.user}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {operation.id} • {operation.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${operation.amount}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600">
                      </span>
                      <Badge
                        variant={
                          operation.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {operation.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      </div>
    </DashboardLayout>
  );
}
