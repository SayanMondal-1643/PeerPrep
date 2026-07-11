"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  mockLoginResponse,
  mockLogoutResponse,
  mockSignupResponse,
} from "@/lib/mock-data";
import { User, UserRole } from "./user-types";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  redirectTo: string | null;
  setRedirectTo: (path: string | null) => void;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  institutionName?: string;
  idProofUrl?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    // UNCOMMENT TO FETCH FROM API
    // const res = await fetch('/api/v1/users/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   credentials: 'include',
    //   body: JSON.stringify({ email, password }),
    // })
    // if (!res.ok) {
    //   const errorData = await res.json()
    //   throw new Error(errorData.message || 'Login failed')
    // }
    // const data = await res.json()

    // MOCK DATA - TO BE REMOVED LATER
    const data = await mockLoginResponse(email, password);

    setUser(data.user);
  };

  const signup = async (data: SignupData) => {
    // UNCOMMENT TO FETCH FROM API
    // const res = await fetch('/api/v1/users/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   credentials: 'include',
    //   body: JSON.stringify(data),
    // })
    // if (!res.ok) {
    //   const errorData = await res.json()
    //   throw new Error(errorData.message || 'Signup failed')
    // }
    // const responseData = await res.json()

    // MOCK DATA - TO BE REMOVED LATER
    const responseData = await mockSignupResponse(data);

    setUser(responseData.user);
  };

  const logout = async () => {
    // UNCOMMENT TO FETCH FROM API
    // await fetch('/api/v1/users/logout', {
    //   method: 'POST',
    //   credentials: 'include',
    // })

    // MOCK DATA - TO BE REMOVED LATER
    await mockLogoutResponse();

    setUser(null);
    setRedirectTo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
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
