import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/lib/Base_URL";
import type {
  TransactionResponse,
  TransactionFilters,
} from "@/types/transactionApi.interface";
// import type { RootState } from "@/store";
// import { getAuthToken, asBearer } from "@/utils/authToken";
import type { RootState } from "../store";
import { asBearer, getAuthToken } from "@/lib/authToken";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/transactions`,
    // credentials: "include", // uncomment if you also want cookies sent automatically
    prepareHeaders: (headers, { getState }) => {
      const token = getAuthToken(getState() as RootState);
      const bearer = asBearer(token);

      if (bearer) headers.set("authorization", bearer);
      else headers.delete("authorization");

      return headers;
    },
  }),
  tagTypes: ["Transaction", "Wallet"],
  endpoints: (builder) => ({
    getMyTransactions: builder.query<TransactionResponse, TransactionFilters>({
      query: (filters) => {
        const params = new URLSearchParams();
        Object.entries(filters ?? {}).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, String(value));
          }
        });
        return `/me?${params.toString()}`;
      },
      providesTags: ["Transaction", "Wallet"],
    }),
    getAllTransactions: builder.query<TransactionResponse, TransactionFilters>({
      query: () => {
        return `/`;
      },
      providesTags: ["Transaction", "Wallet"],
    }),
    addMoney: builder.mutation<
      { message: string; transactionId: string },
      { contact: string; amount: number }
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
      { amount: number; contact: string }
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
  useGetMyTransactionsQuery,
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useSendMoneyMutation,
  useCashInMutation,
  useCashOutMutation,
} = transactionApi;
