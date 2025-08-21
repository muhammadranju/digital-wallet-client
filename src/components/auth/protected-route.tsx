
import type React from "react"

import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useAppSelector } from "@/lib/hooks"
import { Loader2 } from "lucide-react"
import { useNavigate } from "react-router"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ("user" | "agent" | "admin")[]
  redirectTo?: string
}

export function ProtectedRoute({ children, allowedRoles, redirectTo = "/auth/login" }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAppSelector((state) => state.auth)
  const router = useNavigate()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router(redirectTo)
        return
      }

      if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on role
        switch (user.role) {
          case "admin":
            router("/admin/dashboard")
            break
          case "agent":
            router("/agent/dashboard")
            break
          default:
            router("/user/dashboard")
        }
        return
      }
    }
  }, [isAuthenticated, user, isLoading, allowedRoles, router, redirectTo])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
