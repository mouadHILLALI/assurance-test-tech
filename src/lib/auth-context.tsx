"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { users } from "@/data/mock";
import type { User } from "@/types";

interface AuthContextType {
  currentUser: User;
  switchUser: (userId: string) => void;
  availableUsers: User[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(users[0]); // default: ADMIN

  const switchUser = useCallback((userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) setCurrentUser(user);
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, switchUser, availableUsers: users }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
