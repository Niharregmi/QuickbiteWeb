// lib/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { whoami, type UserProfile } from "@/lib/api/auth";

interface AuthContextProps {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isAuthenticated: boolean;
  loading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    const token = Cookies.get("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const result = await whoami();
      setUser(result.data);
    } catch {
      Cookies.remove("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        loading,
        checkAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
