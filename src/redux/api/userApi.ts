import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { User } from "../slices/authSlice"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.paywallet.demo"

export interface UserFilters {
  role?: string
  status?: string
  search?: string
  page?: number
  limit?: number
}

export interface UsersResponse {
  users: User[]
  total: number
  page: number
  totalPages: number
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/users`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, UserFilters>({
      query: (filters) => {
        const params = new URLSearchParams()
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString())
          }
        })
        return `?${params.toString()}`
      },
      providesTags: ["User"],
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/${id}`,
      providesTags: ["User"],
    }),
    updateUserStatus: builder.mutation<User, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["User"],
    }),
    searchUsers: builder.query<User[], string>({
      query: (searchTerm) => `/search?q=${searchTerm}`,
      providesTags: ["User"],
    }),
  }),
})

export const { useGetUsersQuery, useGetUserByIdQuery, useUpdateUserStatusMutation, useSearchUsersQuery } = userApi
