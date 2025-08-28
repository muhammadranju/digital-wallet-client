
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/lib/Base_URL";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/types/authApi.interface";
import type { RootState } from "../store"; // adjust to your store location
import Cookies from "js-cookie";

// helper to read safely from localStorage (avoids SSR errors)
const getFromLocalStorage = (key: string) => {
  if (typeof window === "undefined") return undefined;
  try {
    return window.localStorage.getItem(key) ?? undefined;
  } catch {
    return undefined;
  }
};

// unified token getter
const getAuthToken = (state: RootState) => {
  const fromState = state?.auth?.token as string | undefined;
  if (fromState) return fromState;

  const fromCookie = Cookies.get("token");
  if (fromCookie) return fromCookie;

  const fromLS = getFromLocalStorage("token");
  if (fromLS) return fromLS;

  return undefined;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
    // credentials: "include", // uncomment if you also want cookies automatically sent
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = getAuthToken(state);

      const bearer = token?.startsWith("Bearer ")
        ? token
        : token
        ? `Bearer ${token}`
        : undefined;

      if (bearer) {
        headers.set("authorization", bearer);
      } else {
        headers.delete("authorization");
      }
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation<
      { message: string },
      { email: string; password: string }
    >({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: "/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<
      { message: string; success: boolean },
      { email: string; oneTimeCode: number }
    >({
      query: (data) => ({
        url: "/verify-email",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation<
      { message: string },
      { currentPassword: string; newPassword: string; confirmPassword: string }
    >({
      query: (passwordData) => ({
        url: "/change-password",
        method: "POST",
        body: passwordData,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
} = authApi;
