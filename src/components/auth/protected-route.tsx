import type React from "react";
import { useEffect } from "react";
// import { useRouter } from "next/navigation"
// import { useAppSelector } from "@/lib/hooks"
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/redux/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("user" | "agent" | "admin")[];
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = "/auth/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const router = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router(redirectTo);
        return;
      }

      if (allowedRoles && user && !allowedRoles.includes(user.data.role)) {
        // <-- Change here
        // Redirect to appropriate dashboard based on role
        switch (
          user.data.role // <-- Change here
        ) {
          case "admin":
            router("/admin/dashboard");
            break;
          case "agent":
            router("/agent/dashboard");
            break;
          default:
            router("/user/dashboard");
        }
        return;
      }
    }
  }, [isAuthenticated, user, isLoading, allowedRoles, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.data.role)) {
    // <-- Change here
    return null;
  }

  return <>{children}</>;
}

export interface User {
  data: {
    _id: string;
    id: string;
    email: string;
    name: string;
    phone: string;
    contact: string;
    location: string;
    role: "user" | "agent" | "admin";
    status: "active" | "blocked" | "pending";
    balance?: number;
    createdAt: string;
    image: string;
    verified: boolean;
    length: number;
  };
}
