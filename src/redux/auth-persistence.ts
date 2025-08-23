/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { setCredentials } from "./slices/authSlice";

export function useAuthPersistence() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check for stored auth data on app load
    const storedAuth = localStorage.getItem("paywalletAuth");
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        if (authData.token && authData.user) {
          dispatch(setCredentials(authData));
        }
      } catch (error) {
        // Clear invalid stored data
        localStorage.removeItem("paywalletAuth");
      }
    }
  }, [dispatch]);
}

// Helper function to persist auth data
export function persistAuthData(authData: { user: any; token: string }) {
  localStorage.setItem("paywalletAuth", JSON.stringify(authData));
}

// Helper function to clear auth data
export function clearAuthData() {
  localStorage.removeItem("paywalletAuth");
}
