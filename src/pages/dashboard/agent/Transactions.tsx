/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Search,
  Filter,
  Download,
  CalendarIcon,
  Plus,
  Minus,
  DollarSign,
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { useGetMyTransactionsQuery } from "@/redux/api/transactionApi";
import TransactionsTableSkeletons from "../user/skeletons/TransactionsTableSkeletons";

// Your existing data structure seems to contain correct fields, so we will use them directly
export default function AgentTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const { data, isLoading } = useGetMyTransactionsQuery({
    searchQuery,
    typeFilter,
    statusFilter,
    dateFrom,
    dateTo,
  });

  const transactions = data?.data || [];

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction: any) => {
    const matchesSearch =
      transaction.wallet?.user?.name
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      transaction._id?.toLowerCase().includes(searchQuery?.toLowerCase());
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;
    const matchesDateFrom =
      !dateFrom || new Date(transaction.createdAt) >= dateFrom;
    const matchesDateTo = !dateTo || new Date(transaction.createdAt) <= dateTo;

    return (
      matchesSearch &&
      matchesType &&
      matchesStatus &&
      matchesDateFrom &&
      matchesDateTo
    );
  });
  console.log(filteredTransactions);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Get icon based on the transaction type
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "CASH_IN":
        return <Plus className="h-4 w-4 text-green-600" />;
      case "CASH_OUT":
        return <Minus className="h-4 w-4 text-red-600" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Agent Transactions
            </h1>
            <p className="text-muted-foreground">
              View all transactions you've handled
            </p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent sr-only">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
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
                  <SelectValue placeholder="Operation Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="CASH_IN">Cash In</SelectItem>
                  <SelectItem value="CASH_OUT">Cash Out</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              {/* Date From */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal bg-transparent"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "From Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Date To */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal bg-transparent"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "To Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        {isLoading ? (
          <TransactionsTableSkeletons />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Transactions ({transactions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTransactions.map((transaction: any) => (
                    <TableRow key={transaction._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-muted">
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div>
                            <p className="font-medium capitalize">
                              {transaction.type.replace("_", " ")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {transaction._id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {transaction.wallet.user.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.wallet.user.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          ${transaction.amount.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {format(
                          new Date(transaction.createdAt),
                          "MMM dd, yyyy"
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "COMPLETED"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {transaction.status}
                        </Badge>
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
