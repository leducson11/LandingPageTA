import { useState } from "react";
import { Menu, RefreshCw, ChevronRight, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@admin/components/ui/badge";
import { Button } from "@admin/components/ui/button";
import { cn } from "@admin/lib/utils";
import { useAuth } from "@shared/contexts/AuthContext";

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  breadcrumb: [string, string];
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("vi-VN", { hour12: false });
}

export function Header({ onOpenMobileSidebar, breadcrumb }: HeaderProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState(() => formatTime(new Date()));
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleSync() {
    if (isSyncing) return;
    setIsSyncing(true);
    window.setTimeout(() => {
      setIsSyncing(false);
      setLastSyncedAt(formatTime(new Date()));
    }, 1400);
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-[var(--color-border)] bg-white/90 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <button
          aria-label="Mở menu"
          onClick={onOpenMobileSidebar}
          className="rounded-md p-1.5 text-[var(--color-text-secondary)] hover:bg-gray-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex min-w-0 items-center gap-2">
          <span className="hidden truncate text-[13px] text-[var(--color-text-secondary)] sm:inline">
            {breadcrumb[0]}
          </span>
          <ChevronRight className="hidden h-3.5 w-3.5 shrink-0 text-gray-300 sm:inline" />
          <h1 className="truncate text-[17px] font-bold text-[var(--color-text)] sm:text-[20px]">
            {breadcrumb[1]}
          </h1>
          <Badge tone="violet" className="hidden sm:inline-flex">
            Role: Super Admin
          </Badge>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[12px] font-medium text-emerald-700 md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Đã đồng bộ Google Sheets
          <span className="text-emerald-500">({lastSyncedAt})</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleSync} aria-label="Đồng bộ thủ công">
          <RefreshCw className={cn("h-3.5 w-3.5", isSyncing && "animate-spin")} />
          <span className="hidden sm:inline">{isSyncing ? "Đang đồng bộ..." : "Đồng bộ thủ công"}</span>
        </Button>
        <div className="flex items-center gap-2 border-l border-[var(--color-border)] pl-2 sm:pl-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-[12px] font-semibold text-[var(--color-primary-dark)]">
            {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-[13px] font-semibold text-[var(--color-text)]">{user?.name || 'Admin HuyWay'}</p>
            <p className="text-[11px] text-[var(--color-text-secondary)]">{user?.email}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="ml-2"
            title="Đăng xuất"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
