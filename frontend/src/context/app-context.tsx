"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { User, UserRole } from "@/types";

interface AppContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "u1",
    name: "Avi",
    email: "avi@example.com",
    role: "admin" as UserRole,
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <AppContext.Provider value={{ user, setUser, sidebarCollapsed, setSidebarCollapsed }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}