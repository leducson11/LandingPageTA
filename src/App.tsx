import { useMemo, useState, type ComponentType } from "react";
import { AuthProvider } from "@/lib/auth-context";
import { useAuth } from "@/lib/use-auth";
import { getPermissionLevel } from "@/data/mockAuth";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { LoginPage } from "@/pages/LoginPage";
import { Dashboard } from "@/pages/Dashboard";
import { ContentLandingPage } from "@/pages/ContentLandingPage";
import { CustomersPage } from "@/pages/CustomersPage";
import { StaffPage } from "@/pages/StaffPage";
import { CoursesPage } from "@/pages/CoursesPage";
import { LeadsManagementPage } from "@/pages/LeadsManagementPage";
import { ReportsPage } from "@/pages/ReportsPage";
import { NAV_ITEMS } from "@/data/mockDashboard";

const PAGES: Record<string, ComponentType> = {
  overview: Dashboard,
  content: ContentLandingPage,
  customers: CustomersPage,
  staff: StaffPage,
  courses: CoursesPage,
  leads: LeadsManagementPage,
  reports: ReportsPage,
};

function AuthenticatedApp() {
  const { currentUser } = useAuth();
  const [activeId, setActiveId] = useState("overview");

  const visibleNavItems = useMemo(() => {
    if (!currentUser) return [];
    return NAV_ITEMS.filter((item) => getPermissionLevel(item.id, currentUser.role) !== "none");
  }, [currentUser]);

  if (!currentUser) return <LoginPage />;

  const isAllowed = visibleNavItems.some((item) => item.id === activeId);
  const safeActiveId = isAllowed ? activeId : (visibleNavItems[0]?.id ?? "overview");
  const activeItem = visibleNavItems.find((item) => item.id === safeActiveId);
  const ActivePage = PAGES[safeActiveId] ?? Dashboard;

  return (
    <DashboardLayout
      navItems={visibleNavItems}
      activeId={safeActiveId}
      onSelect={setActiveId}
      breadcrumb={["Tổng quan", safeActiveId === "overview" ? "Dashboard Thống kê" : activeItem?.label ?? ""]}
    >
      <ActivePage />
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}
