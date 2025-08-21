import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.paywallet.demo"

export interface WalletBalance {
  balance: number
  currency: string
  lastUpdated: string
}

export interface DepositRequest {
  amount: number
  agentId: string
  method: "cash" | "bank"
}

export interface WithdrawRequest {
  amount: number
  agentId?: string
  method: "cash" | "bank"
}

export interface SendMoneyRequest {
  recipientId: string
  amount: number
  note?: string
}

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/wallet`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["Wallet"],
  endpoints: (builder) => ({
    getBalance: builder.query<WalletBalance, void>({
      query: () => "/balance",
      providesTags: ["Wallet"],
    }),
    deposit: builder.mutation<{ message: string; transactionId: string }, DepositRequest>({
      query: (depositData) => ({
        url: "/deposit",
        method: "POST",
        body: depositData,
      }),
      invalidatesTags: ["Wallet"],
    }),
    withdraw: builder.mutation<{ message: string; transactionId: string }, WithdrawRequest>({
      query: (withdrawData) => ({
        url: "/withdraw",
        method: "POST",
        body: withdrawData,
      }),
      invalidatesTags: ["Wallet"],
    }),
    sendMoney: builder.mutation<{ message: string; transactionId: string }, SendMoneyRequest>({
      query: (sendData) => ({
        url: "/send",
        method: "POST",
        body: sendData,
      }),
      invalidatesTags: ["Wallet"],
    }),
  }),
})

export const { useGetBalanceQuery, useDepositMutation, useWithdrawMutation, useSendMoneyMutation } = walletApi
