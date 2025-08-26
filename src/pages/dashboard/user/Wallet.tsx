/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardLayout } from "@/components/dashboard-layout";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAddMoneyMutation,
  useSendMoneyMutation,
  useWithdrawMoneyMutation,
} from "@/redux/api/transactionApi";
import { useGetAgentsQuery } from "@/redux/api/userApi";
import { useGetBalanceQuery } from "@/redux/api/walletApi";
import type { DepositRequest } from "@/types/walletApi.interface";
import {
  DollarSign,
  Loader,
  Minus,
  Plus,
  Search,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function WalletPage() {
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [openSendMoney, setOpenSendMoney] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);

  const { data, isLoading, refetch } = useGetBalanceQuery();
  const [deposit, { isLoading: isDepositLoading }] = useAddMoneyMutation();
  const [withdraw, { isLoading: isWithdrawLoading }] =
    useWithdrawMoneyMutation();
  const [sendMoney, { isLoading: isSendMoneyLoading }] = useSendMoneyMutation();

  const { data: agentsData } = useGetAgentsQuery();
  const balance = data?.data;
  const agents = agentsData?.data;

  // Define searchResults (Mock data or replace it with an API call)

  const filteredResults = Array.isArray(agents)
    ? agents.filter(
        (user: any) =>
          user.name.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          user.contact?.includes(searchQuery)
      )
    : [];

  const handleDeposit = () => {
    const newDepositAmount = parseFloat(depositAmount);
    if (isNaN(newDepositAmount)) {
      toast.error("Please enter a valid amount");
      return;
    }

    const depositRequest: DepositRequest = {
      amount: newDepositAmount,
      agentId: "1", // Replace with actual agent ID or source
      method: "cash", // Define the method
    };

    deposit(depositRequest)
      .unwrap()
      .then(() => {
        toast.success("Deposit successful");
        setDepositAmount("");
        refetch();
        setOpen(false);
      })
      .catch(() => {
        toast.error("Failed to make the deposit");
      });
  };

  const handleWithdraw = () => {
    const newWithdrawAmount = parseFloat(withdrawAmount);
    if (isNaN(newWithdrawAmount)) {
      toast.error("Please enter a valid amount");
      return;
    }

    withdraw({ amount: newWithdrawAmount })
      .unwrap()
      .then(() => {
        toast.success("Withdrawal successful");
        refetch();
        setWithdrawAmount("");
        setOpenWithdraw(false);
      })
      .catch(() => {
        toast.error("Failed to make the withdrawal");
      });
  };

  const handleSendMoney = () => {
    if (!recipient || !sendAmount) {
      toast.error("Please fill in the recipient and amount fields");
      return;
    }

    console.log(recipient);
    sendMoney({ contact: recipient, amount: parseFloat(sendAmount) })
      .unwrap()
      .then(() => {
        toast.success("Money sent successfully");
        refetch();
        setSendAmount("");
        setOpenSendMoney(false);
      })
      .catch(() => {
        toast.error("Failed to send money");
      });
  };

  return (
    <DashboardLayout userRole="user">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Wallet</h1>
          <p className="text-muted-foreground">
            Manage your wallet balance and transactions
          </p>
        </div>

        {/* Wallet Balance Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Available Balance
                </p>
                {/* $ */}
                <p className="text-4xl font-bold text-foreground">
                  {isLoading ? (
                    <NumberTicker
                      value={10013570}
                      decimalPlaces={1}
                      className="whitespace-pre-wrap text-4xl font-bold tracking-tighter text-black dark:text-white"
                    />
                  ) : (
                    balance?.balance
                  )}
                  $
                </p>
                <div className="flex items-center gap-2 mt-2 sr-only">
                  <Badge
                    variant="secondary"
                    className="text-green-600 bg-green-50"
                  >
                    +12.5% this month
                  </Badge>
                </div>
              </div>
              <div className="text-primary">
                <DollarSign className="h-12 w-12" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Deposit Money */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold">Deposit Money</h3>
                  <p className="text-sm text-muted-foreground">
                    Add money via agent
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Deposit Money</DialogTitle>
                <DialogDescription>
                  Request a cash deposit through an authorized agent
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="deposit-amount">Amount</Label>
                  <Input
                    id="deposit-amount"
                    placeholder="Enter amount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="agent-location">
                    Preferred Agent Location
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="downtown">Downtown Branch</SelectItem>
                      <SelectItem value="mall">Shopping Mall</SelectItem>
                      <SelectItem value="airport">Airport Terminal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setOpen(false)} variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleDeposit}>
                  {isDepositLoading ? (
                    <Loader className="mr-2 h-4 w-4" />
                  ) : (
                    "Request Deposit"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Withdraw Money */}
          <Dialog open={openWithdraw} onOpenChange={setOpenWithdraw}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Minus className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold">Withdraw Money</h3>
                  <p className="text-sm text-muted-foreground">
                    Cash out from wallet
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Withdraw Money</DialogTitle>
                <DialogDescription>
                  Withdraw cash from your wallet balance
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="withdraw-amount">Amount</Label>
                  <Input
                    id="withdraw-amount"
                    placeholder="Enter amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => setOpenWithdraw(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button onClick={handleWithdraw}>
                  {isWithdrawLoading ? (
                    <Loader className="mr-2 h-4 w-4" />
                  ) : (
                    "Withdraw"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Send Money */}
          <Dialog open={openSendMoney} onOpenChange={setOpenSendMoney}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Send className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Send Money</h3>
                  <p className="text-sm text-muted-foreground">
                    Transfer to another user
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Send Money</DialogTitle>
                <DialogDescription>
                  Send money to another user by searching their phone or email
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="w-full">
                  <Label htmlFor="recipient-search">Search Recipient</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="recipient-search"
                      placeholder="Phone number or email"
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Search Results */}
                {searchQuery && (
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {filteredResults.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
                        onClick={() => {
                          setRecipient(user.contact);
                          setSearchQuery("");
                        }}
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.contact}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {recipient && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Sending to:</span>{" "}
                      {recipient}
                    </p>
                  </div>
                )}

                <div>
                  <Label htmlFor="send-amount">Amount</Label>
                  <Input
                    id="send-amount"
                    placeholder="Enter amount"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => setOpenSendMoney(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendMoney}
                  disabled={!recipient || !sendAmount}
                  // loading={isSendMoneyLoading}
                >
                  {isSendMoneyLoading ? (
                    <Loader className="mr-2 h-4 w-4" />
                  ) : (
                    "Send Money"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DashboardLayout>
  );
}
