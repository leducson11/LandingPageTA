import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Dashboard } from "@/pages/Dashboard";
import { ContentLandingPage } from "@/pages/ContentLandingPage";
import { CustomersPage } from "@/pages/CustomersPage";
import { BudgetPermissionsPage } from "@/pages/BudgetPermissionsPage";
import { StaffPage } from "@/pages/StaffPage";
import { CoursesPage } from "@/pages/CoursesPage";
import { LeadsManagementPage } from "@/pages/LeadsManagementPage";
import { ReportsPage } from "@/pages/ReportsPage";
import { NAV_ITEMS } from "@/data/mockDashboard";

const PAGES: Record<string, React.ComponentType> = {
  overview: Dashboard,
  content: ContentLandingPage,
  customers: CustomersPage,
  budget: BudgetPermissionsPage,
  staff: StaffPage,
  courses: CoursesPage,
  leads: LeadsManagementPage,
  reports: ReportsPage,
};

export default function App() {
  const [activeId, setActiveId] = useState("overview");
  const activeItem = NAV_ITEMS.find((item) => item.id === activeId);
  const ActivePage = PAGES[activeId] ?? Dashboard;

  return (
    <DashboardLayout
      activeId={activeId}
      onSelect={setActiveId}
      breadcrumb={["Tổng quan", activeId === "overview" ? "Dashboard Thống kê" : activeItem?.label ?? ""]}
    >
      <ActivePage />
    </DashboardLayout>
  );
}
