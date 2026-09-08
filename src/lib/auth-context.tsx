import { useEffect, useState, type ReactNode } from "react";
import type { Account, Role } from "@/types/auth";
import { SEED_ACCOUNTS } from "@/data/mockAuth";
import { AuthContext } from "@/lib/auth-context-def";

const STORAGE_KEY_ACCOUNTS = "huyway-admin:accounts";
const STORAGE_KEY_SESSION = "huyway-admin:session-email";

interface LoginResult {
  ok: boolean;
  error?: string;
}

function loadAccounts(): Account[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
    if (raw) return JSON.parse(raw) as Account[];
  } catch {
    // corrupted storage, fall back to seed
  }
  return SEED_ACCOUNTS;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>(loadAccounts);
  const [sessionEmail, setSessionEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_SESSION);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
  }, [accounts]);

  // Derived, not stored: always reflects the latest account record (role,
  // status, name) so editing your own account while logged in stays in sync
  // without needing a separate synchronizing effect.
  const currentUser = sessionEmail ? accounts.find((a) => a.email === sessionEmail) ?? null : null;

  function login(email: string, password: string): LoginResult {
    const account = accounts.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
    if (!account) return { ok: false, error: "Email không tồn tại trong hệ thống." };
    if (account.status === "locked") return { ok: false, error: "Tài khoản đã bị khóa. Vui lòng liên hệ Super Admin." };
    if (account.password !== password) return { ok: false, error: "Mật khẩu không chính xác." };
    setSessionEmail(account.email);
    localStorage.setItem(STORAGE_KEY_SESSION, account.email);
    return { ok: true };
  }

  function logout() {
    setSessionEmail(null);
    localStorage.removeItem(STORAGE_KEY_SESSION);
  }

  function addAccount(input: Omit<Account, "id" | "status">) {
    setAccounts((prev) => [...prev, { ...input, id: `acc-${Date.now()}`, status: "active" }]);
  }

  function updateAccountRole(id: string, role: Role) {
    setAccounts((prev) => prev.map((a) => (a.id === id ? { ...a, role } : a)));
  }

  function toggleAccountStatus(id: string) {
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === "active" ? "locked" : "active" } : a)),
    );
  }

  function removeAccount(id: string) {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
    if (accounts.find((a) => a.id === id)?.email === sessionEmail) logout();
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, accounts, login, logout, addAccount, updateAccountRole, toggleAccountStatus, removeAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
}
