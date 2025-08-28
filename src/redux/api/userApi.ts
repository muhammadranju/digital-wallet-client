import { BASE_URL } from "@/lib/Base_URL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../slices/authSlice";
import type { RootState } from "../store";
import { asBearer, getAuthToken } from "@/lib/authToken";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/user`,
    // credentials: "include", // enable if you also want cookies sent automatically
    prepareHeaders: (headers, { getState }) => {
      const token = getAuthToken(getState() as RootState);
      const bearer = asBearer(token);

      if (bearer) headers.set("authorization", bearer);
      else headers.delete("authorization");

      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => "/profile",
      providesTags: ["User"],
    }),
    getAgents: builder.query<User, void>({
      query: () => "/agents",
    }),
    getUsers: builder.query<User, void>({
      query: () => "/get/users",
    }),
    approveUser: builder.mutation<User, string>({
      query: (userId) => ({
        url: `/approve/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    suspendUser: builder.mutation<User, string>({
      query: (userId) => ({
        url: `/suspend/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useApproveUserMutation,
  useSuspendUserMutation,
  useGetAgentsQuery,
  useGetUsersQuery,
} = userApi;
