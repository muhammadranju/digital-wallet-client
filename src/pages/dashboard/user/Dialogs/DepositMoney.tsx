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
import { useAddMoneyMutation } from "@/redux/api/transactionApi";
import { useGetAgentsQuery } from "@/redux/api/userApi";
import { useGetBalanceQuery } from "@/redux/api/walletApi";
// import type { DepositRequest } from "@/types/walletApi.interface";
import { Plus, Search, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DepositMoney = () => {
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recipient, setRecipient] = useState("");

  const [deposit, { isLoading: isDepositLoading }] = useAddMoneyMutation();
  const { refetch } = useGetBalanceQuery();
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

  const handleDeposit = () => {
    if (depositAmount.length > 11) {
      toast.warning("You can only send up to 11 digits amount");
      return;
    }

    const newDepositAmount = parseFloat(depositAmount);
    if (isNaN(newDepositAmount)) {
      toast.error("Please enter a valid amount");
      return;
    }

    deposit({ contact: recipient, amount: newDepositAmount })
      .unwrap()
      .then(() => {
        toast.success("Deposit successful");
        setDepositAmount("");
        refetch();
        setOpen(false);
      })
      .catch((error) => {
        toast.warning(error.data.message || "Failed to make the cash out");
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold">Deposit Money</h3>
            <p className="text-sm text-muted-foreground">Add money via agent</p>
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
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleDeposit}>
            {isDepositLoading ? "Pressing to deposit..." : "Request Deposit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DepositMoney;
