import type { LucideIcon } from "lucide-react";

export type DateRangeKey = "today" | "7d" | "30d" | "custom";

export interface DashboardKPI {
  id: string;
  title: string;
  value: string;
  trend?: string;
  trendDirection?: "up" | "down";
  description: string;
  icon: LucideIcon;
  tone: "default" | "danger";
  badge?: string;
}

export interface LeadsByDayPoint {
  day: string;
  leads: number;
}

export interface LeadStatusSlice {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface CourseInterest {
  id: string;
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export type SyncStatus = "auto" | "pending" | "error" | "full";

export interface TrafficSource {
  id: string;
  channel: string;
  registrations: number;
  conversionRate: number;
  syncStatus: SyncStatus;
}

export interface DashboardDataset {
  kpis: DashboardKPI[];
  leadsByDay: LeadsByDayPoint[];
  leadStatus: LeadStatusSlice[];
  courses: CourseInterest[];
  trafficSources: TrafficSource[];
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}
