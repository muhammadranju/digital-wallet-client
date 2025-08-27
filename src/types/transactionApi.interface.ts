export interface Transaction {
  amount: number;
  data: {
    id: string;
    type: "deposit" | "withdraw" | "send" | "receive";
    amount: number;
    currency: string;
    status: "pending" | "completed" | "failed" | "cancelled";
    description: string;
    recipientId?: string;
    recipientName?: string;
    agentId?: string;
    agentName?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface TransactionFilters {
  type?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  page?: number;
  limit?: number;
  searchQuery?: string;
  typeFilter?: string;

  statusFilter?: string;
  dateFrom?: Date;
  dateTo?: Date;

  cashIn?: boolean;
  cashOut?: boolean;
}

export interface TransactionResponse {
  data: {
    transactions: Transaction[];
    total: number;
    page: number;
    totalPages: number;
    length: number;
    slice: (start: number, end: number) => Transaction[];
    filter: (filters: TransactionFilters) => Transaction[];
  };
}
