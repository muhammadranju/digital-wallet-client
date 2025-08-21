import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.paywallet.demo"

export interface Transaction {
  id: string
  type: "deposit" | "withdraw" | "send" | "receive"
  amount: number
  currency: string
  status: "pending" | "completed" | "failed" | "cancelled"
  description: string
  recipientId?: string
  recipientName?: string
  agentId?: string
  agentName?: string
  createdAt: string
  updatedAt: string
}

export interface TransactionFilters {
  type?: string
  status?: string
  startDate?: string
  endDate?: string
  minAmount?: number
  maxAmount?: number
  page?: number
  limit?: number
}

export interface TransactionResponse {
  transactions: Transaction[]
  total: number
  page: number
  totalPages: number
}

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/transactions`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionResponse, TransactionFilters>({
      query: (filters) => {
        const params = new URLSearchParams()
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString())
          }
        })
        return `?${params.toString()}`
      },
      providesTags: ["Transaction"],
    }),
    getTransactionById: builder.query<Transaction, string>({
      query: (id) => `/${id}`,
      providesTags: ["Transaction"],
    }),
    getAllTransactions: builder.query<TransactionResponse, TransactionFilters>({
      query: (filters) => {
        const params = new URLSearchParams()
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString())
          }
        })
        return `/all?${params.toString()}`
      },
      providesTags: ["Transaction"],
    }),
  }),
})

export const { useGetTransactionsQuery, useGetTransactionByIdQuery, useGetAllTransactionsQuery } = transactionApi
