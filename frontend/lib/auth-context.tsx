"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch, ApiClientError } from "@/lib/api-client";
import { User, SignupData, ApiAuthResponse, MeResponse } from "./user-types";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  redirectTo: string | null;
  setRedirectTo: (path: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const json = await apiFetch<MeResponse>("/users/me");
        return json.data;
      } catch (err) {
        if (err instanceof ApiClientError && err.status === 401) {
          return null;
        }
        throw err;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const login = async (email: string, password: string) => {
    const data = await apiFetch<ApiAuthResponse>("/users/login", {
      method: "POST",
      body: { email, password },
    });

    queryClient.setQueryData(["currentUser"], data.data);
  };

  const signup = async (data: SignupData) => {
    const responseData = await apiFetch<ApiAuthResponse>("/users/signup", {
      method: "POST",
      body: data,
    });

    queryClient.setQueryData(["currentUser"], responseData.data);
  };

  const logout = async () => {
    await apiFetch("/users/logout", { method: "POST" });

    queryClient.setQueryData(["currentUser"], null);
    setRedirectTo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoggedIn: !!user,
        isLoading,
        login,
        signup,
        logout,
        redirectTo,
        setRedirectTo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
