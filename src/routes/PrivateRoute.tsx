// import Cookies from "js-cookie";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = localStorage.getItem("token");

  if (isAuthenticated) {
    return children;
  } else {
    // Redirect to login page if not authenticated

    return <Navigate to="/auth/login" replace />;
  }
};

export default PrivateRoute;
