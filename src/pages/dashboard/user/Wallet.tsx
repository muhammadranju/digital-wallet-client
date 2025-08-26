import { DashboardLayout } from "@/components/dashboard-layout";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useGetBalanceQuery } from "@/redux/api/walletApi";
import { DollarSign } from "lucide-react";
import DepositMoney from "./Dialogs/DepositMoney";
import SendMoney from "./Dialogs/SendMoney";
import WithdrawMoney from "./Dialogs/WithdrawMoney";

export default function WalletPage() {
  const { data, isLoading } = useGetBalanceQuery();

  const balance = data?.data;

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
                      value={1001}
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
          <DepositMoney />

          {/* Withdraw Money */}
          <WithdrawMoney />

          {/* Send Money */}
          <SendMoney />
        </div>
      </div>
    </DashboardLayout>
  );
}
