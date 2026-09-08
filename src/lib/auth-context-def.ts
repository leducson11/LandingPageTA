import { createContext } from "react";
import type { Account, Role } from "@/types/auth";

interface LoginResult {
  ok: boolean;
  error?: string;
}

export interface AuthContextValue {
  currentUser: Account | null;
  accounts: Account[];
  login: (email: string, password: string) => LoginResult;
  logout: () => void;
  addAccount: (input: Omit<Account, "id" | "status">) => void;
  updateAccountRole: (id: string, role: Role) => void;
  toggleAccountStatus: (id: string) => void;
  removeAccount: (id: string) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
