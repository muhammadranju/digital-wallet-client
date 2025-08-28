/* eslint-disable @typescript-eslint/no-unused-vars */
import { DashboardLayout } from "@/components/dashboard-layout";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useGetAllTransactionsQuery } from "@/redux/api/transactionApi";
import { format } from "date-fns";
import {
  ArrowDown,
  ArrowUp,
  Download,
  Filter,
  Search,
  Send,
} from "lucide-react";
import { useState } from "react";
import SkeletonTable from "./skeletons/TabelSkeletons";

export default function AdminTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");
  // const [dateTo, setDateTo] = useState<Date>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch data from the API
  const { data: transactionsData, isLoading: transactionsIsLoading } =
    useGetAllTransactionsQuery({});

  // Use mock data if API data isn't available
  const transactions = Array.isArray(transactionsData?.data)
    ? transactionsData.data
    : [
        {
          _id: "68ae21e436627628aff187b0",
          type: "CASH_IN",
          amount: 100,
          wallet: "68ae193736627628aff18777",
          status: "COMPLETED",
          createdAt: "2025-08-26T21:06:44.978Z",
          walletDetails: { balance: 1192200 },
          userDetails: { name: "Demo Agent", email: "agent@gmail.com" },
        },
      ];

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction._id.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      transaction.userDetails.name
        .toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      transaction.userDetails.email
        .toLowerCase()
        .includes(searchQuery?.toLowerCase());
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;
    // const matchesCategory =
    //   categoryFilter === "all" || transaction.wallet === categoryFilter;
    // const matchesRisk =
    //   riskFilter === "all" || transaction.riskLevel === riskFilter;
    const matchesAmountMin =
      !amountMin || transaction.amount >= Number.parseFloat(amountMin);
    const matchesAmountMax =
      !amountMax || transaction.amount <= Number.parseFloat(amountMax);
    // const matchesDateFrom =
    //   !dateFrom || new Date(transaction.createdAt) >= dateFrom;
    // const matchesDateTo = !dateTo || new Date(transaction.createdAt) <= dateTo;

    return (
      matchesSearch &&
      matchesType &&
      matchesStatus &&
      // matchesCategory &&
      // matchesRisk &&
      matchesAmountMin &&
      matchesAmountMax
      // matchesDateFrom &&
      // matchesDateTo
    );
  });

  const totalWithdrawalTransactions = filteredTransactions.filter(
    (transaction) => {
      console.log(transaction.type);
      return transaction.type === "WITHDRAW";
    }
  );

  const totalWithdrawalAmount = totalWithdrawalTransactions.reduce(
    (sum, transaction) => {
      return sum + transaction.amount; // Summing up the amount of each withdrawal
    },
    0
  );

  // Filter for 'DEPOSIT' transactions
  const totalDepositTransactions = filteredTransactions.filter(
    (transaction) => transaction.type === "ADD_MONEY"
  );

  // Summarize the total amount of 'DEPOSIT' transactions
  const totalDepositAmount = totalDepositTransactions.reduce(
    (sum, transaction) => {
      return sum + transaction.amount;
    },
    0
  );

  // Filter for 'SEND_MONEY' transactions
  const totalSendMoneyTransactions = filteredTransactions.filter(
    (transaction) => {
      return transaction.type === "SEND_MONEY";
    }
  );

  // Summarize the total amount of 'SEND_MONEY' transactions
  const totalSendMoneyAmount = totalSendMoneyTransactions.reduce(
    (sum, transaction) => {
      return sum + transaction.amount;
    },
    0
  );

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate totals
  const totalVolume = filteredTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );
  const totalFees = filteredTransactions.reduce(
    (sum, t) => sum + t.walletDetails.balance,
    0
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-50 text-green-700";
      case "PENDING":
        return "bg-orange-50 text-orange-700";
      case "FAILED":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  //   export enum PayType {
  //   ADD_MONEY = 'ADD_MONEY',
  //   WITHDRAW = 'WITHDRAW',
  //   SEND_MONEY = 'SEND_MONEY',
  //   CASH_IN = 'CASH_IN',
  //   CASH_OUT = 'CASH_OUT',
  // }
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "CASH_IN":
        return "bg-green-50 text-green-700";
      case "CASH_OUT":
        return "bg-purple-50 text-purple-700";
      case "ADD_MONEY":
        return "bg-blue-50 text-blue-700";
      case "WITHDRAW":
        return "bg-red-50 text-red-700";
      case "SEND_MONEY":
        return "bg-orange-50 text-orange-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Transaction Management
            </h1>
            <p className="text-muted-foreground">
              Monitor and analyze all system transactions
            </p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent sr-only">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Cash In</p>
                  <p className="text-2xl font-bold text-orange-500">
                    $
                    {transactionsIsLoading ? (
                      <NumberTicker
                        value={101112}
                        decimalPlaces={1}
                        className="whitespace-pre-wrap  font-bold tracking-tighter text-orange-500 dark:text-white"
                      />
                    ) : (
                      totalVolume.toFixed(2)
                    )}
                  </p>
                </div>
                <ArrowUp size={24} color="orange" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Cash Out
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    $
                    {transactionsIsLoading ? (
                      <NumberTicker
                        value={101112}
                        decimalPlaces={1}
                        className="whitespace-pre-wrap  font-bold tracking-tighter text-purple-500 dark:text-white"
                      />
                    ) : (
                      totalFees.toFixed(2)
                    )}
                  </p>
                </div>
                <ArrowDown size={24} color="purple" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Deposit</p>
                  <p className="text-2xl font-bold text-green-600">
                    $
                    {transactionsIsLoading ? (
                      <NumberTicker
                        value={101112}
                        decimalPlaces={1}
                        className="whitespace-pre-wrap  font-bold tracking-tighter text-green-500 dark:text-white"
                      />
                    ) : (
                      totalDepositAmount.toFixed(2)
                    )}
                  </p>
                </div>
                <ArrowUp size={24} color="green" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Withdraw
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    $
                    {transactionsIsLoading ? (
                      <NumberTicker
                        value={101112}
                        decimalPlaces={1}
                        className="whitespace-pre-wrap  font-bold tracking-tighter text-red-500 dark:text-white"
                      />
                    ) : (
                      totalWithdrawalAmount.toFixed(2)
                    )}
                  </p>
                </div>
                <ArrowDown size={24} color="red" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Send Money
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    $
                    {transactionsIsLoading ? (
                      <NumberTicker
                        value={101112}
                        decimalPlaces={1}
                        className="whitespace-pre-wrap  font-bold tracking-tighter text-blue-500 dark:text-white"
                      />
                    ) : (
                      totalSendMoneyAmount.toFixed(2)
                    )}
                  </p>
                </div>
                <Send size={24} color="blue" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Filters */}
        <Card className="sr-only">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Type Filter */}
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Transaction Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="CASH_IN">Cash In</SelectItem>
                  <SelectItem value="CASH_OUT">Cash Out</SelectItem>
                  <SelectItem value="TRANSFER">Transfer</SelectItem>
                  <SelectItem value="WITHDRAWAL">Withdrawal</SelectItem>
                  <SelectItem value="DEPOSIT">Deposit</SelectItem>
                  <SelectItem value="SEND_MONEY">Send Money</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                </SelectContent>
              </Select>

              {/* Amount Range */}
              <Input
                placeholder="Min Amount"
                value={amountMin}
                onChange={(e) => setAmountMin(e.target.value)}
              />
              <Input
                placeholder="Max Amount"
                value={amountMax}
                onChange={(e) => setAmountMax(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}

        {transactionsIsLoading ? (
          <SkeletonTable />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>
                Transactions ({filteredTransactions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Status</TableHead>
                    {/* <TableHead>Risk</TableHead> */}
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTransactions.map((transaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">
                            {transaction.userDetails.name}
                          </p>
                          <p className="text-muted-foreground">
                            {transaction.userDetails.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{transaction._id}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`capitalize ${getPaymentStatusColor(
                            transaction.type
                          )}`}
                        >
                          {transaction.type?.toLowerCase().replace("_", " ")}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <span className="font-medium">
                          ${transaction.amount.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          ${transaction.walletDetails.balance.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`${getStatusColor(
                            transaction.status
                          )} capitalize`}
                        >
                          {transaction.status.toLowerCase()}
                        </Badge>
                      </TableCell>
                      {/* <TableCell>
                      <Badge
                        variant="secondary"
                        className={getRiskColor(transaction.riskLevel)}
                      >
                        {transaction.riskLevel}
                      </Badge>
                    </TableCell> */}
                      <TableCell>
                        <span className="text-sm">
                          {format(
                            new Date(transaction.createdAt),
                            "MMM dd, yyyy"
                          )}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(
                    startIndex + itemsPerPage,
                    filteredTransactions.length
                  )}{" "}
                  of {filteredTransactions.length} transactions
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
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
