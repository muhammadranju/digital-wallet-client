/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RootState } from "@/redux/store";
import Cookies from "js-cookie";

const getFromLocalStorage = (key: string) => {
  if (typeof window === "undefined") return undefined;
  try {
    return window.localStorage.getItem(key) ?? undefined;
  } catch {
    return undefined;
  }
};

export const getAuthToken = (state: RootState) => {
  const fromState = (state as any)?.auth?.token as string | undefined;
  if (fromState) return fromState;

  const fromCookie = Cookies.get("token");
  if (fromCookie) return fromCookie;

  const fromLS = getFromLocalStorage("token");
  if (fromLS) return fromLS;

  return undefined;
};

export const asBearer = (token?: string) =>
  token?.startsWith("Bearer ") ? token : token ? `Bearer ${token}` : undefined;
