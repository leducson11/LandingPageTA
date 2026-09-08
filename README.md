# HuyWay English — Admin Dashboard

Production-ready Admin Dashboard scaffold built with React + TypeScript + Vite + Tailwind CSS v4 + Recharts + Lucide, based on the HuyWay English reference wireframe.

## Getting started

```bash
npm install
npm run dev       # start dev server
npm run build     # type-check + production build
npm run preview   # preview the production build
npm run lint      # oxlint
```

## Structure

```
src/
├── components/
│   ├── layout/       Sidebar, Header, DashboardLayout
│   ├── dashboard/     KpiCard, LeadsChart, LeadDistributionChart, CourseInterest, LeadSourceTable
│   └── ui/            Card, Badge, Button primitives
├── pages/Dashboard.tsx
├── data/mockDashboard.ts   typed mock data, varies by date range
├── types/dashboard.ts
└── App.tsx
```

## Notes

- Design tokens (colors, radius, shadows) are defined in `src/index.css` via Tailwind v4's `@theme`.
- Sidebar collapses on desktop and becomes a drawer on mobile/tablet.
- Date range filter (Hôm nay / 7 ngày / 30 ngày / Tùy chỉnh) updates KPIs and the leads chart, with a brief loading skeleton.
- Traffic source table supports search and column sorting.
- Only "Tổng quan" (Overview) is fully built out; other sidebar items show a placeholder — wire up real pages/routing as those modules are built.
