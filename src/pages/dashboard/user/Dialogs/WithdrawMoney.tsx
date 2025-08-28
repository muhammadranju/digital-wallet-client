/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useWithdrawMoneyMutation } from "@/redux/api/transactionApi";
import { useGetAgentsQuery } from "@/redux/api/userApi";
import { useGetBalanceQuery } from "@/redux/api/walletApi";
import { Minus, Search, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const WithdrawMoney = () => {
  // const [withdrawAmount, setWithdrawAmount] = useState("");
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [recipient, setRecipient] = useState("");
  const { refetch } = useGetBalanceQuery();
  const [withdraw, { isLoading: isWithdrawLoading }] =
    useWithdrawMoneyMutation();

  const { data: agentsData } = useGetAgentsQuery();
  const agents = agentsData?.data;

  const filteredResults = Array.isArray(agents)
    ? agents.filter(
        (user: any) =>
          user.name.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          user.contact?.includes(searchQuery)
      )
    : [];

  const handleWithdraw = () => {
    if (sendAmount.length > 11) {
      toast.warning("You can only send up to 11 digits amount");
      return;
    }

    const newWithdrawAmount = parseFloat(sendAmount);
    if (isNaN(newWithdrawAmount)) {
      toast.error("Please enter a valid amount");
      return;
    }

    withdraw({ contact: recipient, amount: newWithdrawAmount })
      .unwrap()
      .then(() => {
        toast.success("Withdrawal successful");
        refetch();
        // setWithdrawAmount("");
        setOpenWithdraw(false);
      })
      .catch(() => {
        toast.error("Failed to make the withdrawal");
      });
  };
  return (
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
        </div>
        {recipient && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">
              <span className="text-muted-foreground">Sending to:</span>{" "}
              {recipient}
            </p>
          </div>
        )}
        <div>
          <Label htmlFor="deposit-amount">Amount</Label>
          <Input
            id="deposit-amount"
            placeholder="Enter amount"
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={() => setOpenWithdraw(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleWithdraw}>
            {isWithdrawLoading ? "Pressing to withdraw..." : "Withdraw"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawMoney;
