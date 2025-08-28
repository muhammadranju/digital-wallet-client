import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/lib/Base_URL";
import type {
  DepositRequest,
  WithdrawRequest,
  SendMoneyRequest,
  WalletBalance,
} from "@/types/walletApi.interface";
import { asBearer, getAuthToken } from "@/lib/authToken";
import type { RootState } from "../store";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/wallets`,
    prepareHeaders: (headers, { getState }) => {
      const token = getAuthToken(getState() as RootState);
      const bearer = asBearer(token);

      if (bearer) headers.set("authorization", bearer);
      else headers.delete("authorization");

      return headers;
    },
  }),
  tagTypes: ["Wallet", "Transaction"],
  endpoints: (builder) => ({
    // Get wallet balance
    getBalance: builder.query<WalletBalance, void>({
      query: () => "/me",
      providesTags: ["Wallet", "Transaction"],
    }),

    deposit: builder.mutation<
      { message: string; transactionId: string },
      DepositRequest
    >({
      query: (depositData) => ({
        url: "/send-money",
        method: "POST",
        body: depositData,
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),

    // Withdraw money
    withdraw: builder.mutation<
      { message: string; transactionId: string },
      WithdrawRequest
    >({
      query: (withdrawData) => ({
        url: "/withdraw",
        method: "POST",
        body: withdrawData,
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),

    // Send money
    sendMoney: builder.mutation<
      { message: string; transactionId: string },
      SendMoneyRequest
    >({
      query: (sendData) => ({
        url: "/send-money",
        method: "POST",
        body: sendData,
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),

    // Block wallet
    blockWallet: builder.mutation<WalletBalance, string>({
      query: (walletId) => ({
        url: `/block/${walletId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),

    // Unblock wallet
    unblockWallet: builder.mutation<WalletBalance, string>({
      query: (walletId) => ({
        url: `/unblock/${walletId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),
  }),
});

export const {
  useGetBalanceQuery,
  useDepositMutation,
  useWithdrawMutation,
  useSendMoneyMutation,
  useBlockWalletMutation,
  useUnblockWalletMutation,
} = walletApi;
