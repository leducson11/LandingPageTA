import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/dashboard";

interface DashboardLayoutProps {
  navItems: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  breadcrumb: [string, string];
  children: ReactNode;
}

export function DashboardLayout({ navItems, activeId, onSelect, breadcrumb, children }: DashboardLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Sidebar
        items={navItems}
        activeId={activeId}
        onSelect={(id) => {
          onSelect(id);
          setIsMobileOpen(false);
        }}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
      />

      <div className={cn("flex min-h-screen flex-col transition-[padding] duration-200", isCollapsed ? "lg:pl-[76px]" : "lg:pl-[240px]")}>
        <Header onOpenMobileSidebar={() => setIsMobileOpen(true)} breadcrumb={breadcrumb} />
        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
