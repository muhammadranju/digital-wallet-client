// import Cookies from "js-cookie";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

const UserRoute = ({ children }: { children: ReactNode }) => {
  const isUser = localStorage.getItem("userRole");

  if (isUser === "USER") {
    return children;
  } else {
    // Redirect to login page if not authenticated

    return <Navigate to="/" replace />;
  }
};

export default UserRoute;
