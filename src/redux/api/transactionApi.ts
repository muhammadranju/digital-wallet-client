/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/lib/Base_URL";
import type {
  TransactionResponse,
  TransactionFilters,
} from "@/types/transactionApi.interface";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/transactions`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Transaction", "Wallet"],
  endpoints: (builder) => ({
    getAllTransactions: builder.query<TransactionResponse, TransactionFilters>({
      query: (filters) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString());
          }
        });
        return `/me?${params.toString()}`;
      },
    }),
    addMoney: builder.mutation<
      { message: string; transactionId: string },
      { amount: number }
    >({
      query: (data) => ({
        url: "/add-money",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Transaction", "Wallet"],
    }),
    withdrawMoney: builder.mutation<
      { message: string; transactionId: string },
      { amount: number }
    >({
      query: (data) => ({
        url: "/withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),
    sendMoney: builder.mutation<
      { message: string; transactionId: string },
      { contact: string; amount: number }
    >({
      query: (data) => ({
        url: "/send-money",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),
    cashIn: builder.mutation<
      { message: string; transactionId: string },
      { receiverId: string; amount: number }
    >({
      query: (data) => ({
        url: "/cash-in",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),
    cashOut: builder.mutation<
      { message: string; transactionId: string },
      { receiverId: string; amount: number }
    >({
      query: (data) => ({
        url: "/cash-out",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useSendMoneyMutation,
  useCashInMutation,
  useCashOutMutation,
} = transactionApi;
