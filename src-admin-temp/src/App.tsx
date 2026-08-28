import { useState } from "react";
import { LayoutGrid } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Dashboard } from "@/pages/Dashboard";
import { NAV_ITEMS } from "@/data/mockDashboard";

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-white/60 px-6 py-20 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)]">
        <LayoutGrid className="h-5 w-5" />
      </div>
      <p className="text-[15px] font-semibold text-[var(--color-text)]">{label}</p>
      <p className="max-w-sm text-[13px] text-[var(--color-text-secondary)]">
        Module này đang được xây dựng. Quay lại Tổng quan để xem số liệu Dashboard chính.
      </p>
    </div>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState("overview");
  const activeItem = NAV_ITEMS.find((item) => item.id === activeId);

  return (
    <DashboardLayout
      activeId={activeId}
      onSelect={setActiveId}
      breadcrumb={["Tổng quan", activeId === "overview" ? "Dashboard Thống kê" : activeItem?.label ?? ""]}
    >
      {activeId === "overview" ? <Dashboard /> : <ComingSoon label={activeItem?.label ?? ""} />}
    </DashboardLayout>
  );
}
