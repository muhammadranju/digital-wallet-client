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
import { useSendMoneyMutation } from "@/redux/api/transactionApi";
import { useGetUsersQuery } from "@/redux/api/userApi";
import { useGetBalanceQuery } from "@/redux/api/walletApi";
import { Search, Send, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SendMoney = () => {
  const [openSendMoney, setOpenSendMoney] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { refetch } = useGetBalanceQuery();
  const { data: usersData } = useGetUsersQuery();
  const users = usersData?.data;

  const filteredResults = Array.isArray(users)
    ? users.filter(
        (user: any) =>
          user.name.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          user.contact?.includes(searchQuery)
      )
    : [];

  const [sendMoney, { isLoading: isSendMoneyLoading }] = useSendMoneyMutation();

  const handleSendMoney = () => {
    if (!recipient || !sendAmount) {
      toast.error("Please fill in the recipient and amount fields");
      return;
    }

    if (sendAmount.length > 11) {
      toast.warning("You can only send up to 11 digits amount");
      return;
    }

    sendMoney({ contact: recipient, amount: parseFloat(sendAmount) })
      .unwrap()
      .then(() => {
        toast.success("Money sent successfully");
        refetch();
        setSendAmount("");
        setOpenSendMoney(false);
      })
      .catch((error) => {
        if (error.data.message === "You don’t have sufficient balance") {
          toast.warning(error.data.message);
          return;
        } else {
          toast.error(error.data.message || "Failed to send money");
        }
      });
  };

  return (
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
          <Button onClick={() => setOpenSendMoney(false)} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={handleSendMoney}
            disabled={!recipient || !sendAmount}
            // loading={isSendMoneyLoading}
          >
            {isSendMoneyLoading ? "Pressing to send money..." : "Send Money"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SendMoney;
