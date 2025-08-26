import type { User } from "@/redux/slices/authSlice";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  contact: string;
  location: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    role: string;
    id: string;
    email: string;
    contact: string;
    location: string;
    status?: string;
    user: User;
    name: string;
    token: string;
    message: string;
    statusCode: number;
    success: boolean;
  };
}
