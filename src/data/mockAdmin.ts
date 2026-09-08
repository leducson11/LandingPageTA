import type {
  AdminCourse,
  ChannelBudget,
  Customer,
  LandingSection,
  LeadRow,
  PermissionRow,
  RevenuePoint,
  StaffMember,
  StaffPerformance,
} from "@/types/admin";

export const LANDING_SECTIONS: LandingSection[] = [
  { id: "hero", name: "Hero Banner", type: "Banner chính", status: "published", updatedAt: "05/09/2026", updatedBy: "Admin HuyWay" },
  { id: "teacher", name: "Giới thiệu Giảng viên", type: "Profile", status: "published", updatedAt: "03/09/2026", updatedBy: "Thầy Huy" },
  { id: "courses", name: "Khóa Học Nổi Bật", type: "Danh sách khóa học", status: "published", updatedAt: "01/09/2026", updatedBy: "Admin HuyWay" },
  { id: "testimonial", name: "Cảm Nhận Học Viên", type: "Testimonial", status: "draft", updatedAt: "30/08/2026", updatedBy: "Marketing Team" },
  { id: "achievements", name: "Thành Tích IELTS", type: "Số liệu nổi bật", status: "published", updatedAt: "28/08/2026", updatedBy: "Admin HuyWay" },
  { id: "cta", name: "CTA Đăng Ký Tư Vấn", type: "Form đăng ký", status: "published", updatedAt: "27/08/2026", updatedBy: "Marketing Team" },
  { id: "faq", name: "Câu Hỏi Thường Gặp", type: "FAQ", status: "draft", updatedAt: "20/08/2026", updatedBy: "Admin HuyWay" },
  { id: "footer", name: "Footer & Liên hệ", type: "Footer", status: "published", updatedAt: "15/08/2026", updatedBy: "Admin HuyWay" },
];

const FIRST_NAMES = ["Nguyễn Văn", "Trần Thị", "Lê Hoàng", "Phạm Thị", "Đỗ Minh", "Vũ Thu", "Hoàng Anh", "Bùi Ngọc", "Đặng Gia", "Ngô Thảo", "Dương Quốc", "Lý Kim"];
const LAST_NAMES = ["An", "Bình", "Chi", "Dũng", "Hà", "Khang", "Linh", "Minh", "Nam", "Phương", "Quân", "Trang"];
const COURSES = ["IELTS Intensive", "Giao tiếp Doanh nghiệp", "TOEIC 550+", "Tiếng Anh Nền tảng"];
const SOURCES = ["Facebook Ads IELTS Camp", "Google Search (Brand + SEO)", "TikTok Social Link", "Direct / Other"];
const CSKH = ["Thu Hà", "Minh Quân", "Bảo Trân"];

function nameAt(i: number) {
  return `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[(i * 3) % LAST_NAMES.length]}`;
}

function phoneAt(i: number) {
  return `09${(12345678 + i * 137) % 90000000 + 10000000}`.slice(0, 10);
}

const CUSTOMER_STATUSES: Customer["status"][] = ["new", "in-progress", "won", "lost"];

export const CUSTOMERS: Customer[] = Array.from({ length: 24 }, (_, i) => {
  const name = nameAt(i);
  return {
    id: `cust-${i + 1}`,
    name,
    phone: phoneAt(i),
    email: `${name.split(" ").join("").toLowerCase()}@gmail.com`,
    courseInterest: COURSES[i % COURSES.length],
    source: SOURCES[i % SOURCES.length],
    status: CUSTOMER_STATUSES[i % CUSTOMER_STATUSES.length],
    assignee: CSKH[i % CSKH.length],
    createdAt: `0${(i % 9) + 1}/09/2026`,
  };
});

export const STAFF_MEMBERS: StaffMember[] = [
  { id: "s1", name: "Lưu Tiến Huy", email: "huy@huyway.edu.vn", role: "Giáo viên chính", department: "Đào tạo", status: "active", joinedAt: "01/2023" },
  { id: "s2", name: "Nguyễn Thu Hà", email: "ha.nguyen@huyway.edu.vn", role: "CSKH", department: "Chăm sóc khách hàng", status: "active", joinedAt: "06/2024" },
  { id: "s3", name: "Trần Minh Quân", email: "quan.tran@huyway.edu.vn", role: "CSKH", department: "Chăm sóc khách hàng", status: "active", joinedAt: "02/2025" },
  { id: "s4", name: "Lê Bảo Trân", email: "tran.le@huyway.edu.vn", role: "CSKH", department: "Chăm sóc khách hàng", status: "active", joinedAt: "09/2025" },
  { id: "s5", name: "Phạm Gia Bảo", email: "bao.pham@huyway.edu.vn", role: "Marketing Executive", department: "Marketing", status: "active", joinedAt: "03/2024" },
  { id: "s6", name: "Đỗ Ngọc Ánh", email: "anh.do@huyway.edu.vn", role: "Content Creator", department: "Marketing", status: "active", joinedAt: "11/2024" },
  { id: "s7", name: "Vũ Hoài Nam", email: "nam.vu@huyway.edu.vn", role: "Giáo viên IELTS", department: "Đào tạo", status: "active", joinedAt: "05/2025" },
  { id: "s8", name: "Hoàng Thảo Vy", email: "vy.hoang@huyway.edu.vn", role: "Kế toán", department: "Vận hành", status: "inactive", joinedAt: "01/2022" },
];

export const ADMIN_COURSES: AdminCourse[] = [
  { id: "c1", name: "IELTS Intensive (Luyện thi cấp tốc)", category: "IELTS", price: 6500000, students: 542, capacity: 600, status: "open" },
  { id: "c2", name: "Giao tiếp Doanh nghiệp / Đi làm", category: "Giao tiếp", price: 4200000, students: 310, capacity: 400, status: "open" },
  { id: "c3", name: "TOEIC 550+ Đột phá", category: "TOEIC", price: 3800000, students: 245, capacity: 300, status: "open" },
  { id: "c4", name: "Tiếng Anh Nền tảng cho người mất gốc", category: "Nền tảng", price: 2900000, students: 151, capacity: 250, status: "open" },
  { id: "c5", name: "IELTS Speaking Workshop", category: "IELTS", price: 1800000, students: 88, capacity: 120, status: "open" },
  { id: "c6", name: "Luyện thi TOEFL iBT", category: "TOEFL", price: 5200000, students: 34, capacity: 150, status: "closed" },
];

export const CHANNEL_BUDGETS: ChannelBudget[] = [
  { id: "b1", channel: "Facebook Ads IELTS Camp", budget: 80_000_000, spent: 62_400_000 },
  { id: "b2", channel: "Google Search (Brand + SEO)", budget: 40_000_000, spent: 18_200_000 },
  { id: "b3", channel: "TikTok Social Link", budget: 30_000_000, spent: 27_900_000 },
  { id: "b4", channel: "Direct / Referral Program", budget: 15_000_000, spent: 6_100_000 },
];

export const PERMISSION_ROWS: PermissionRow[] = [
  { id: "p1", module: "Tổng quan Dashboard", superAdmin: "full", marketing: "view", cskh: "view", teacher: "none" },
  { id: "p2", module: "Quản lý Content Landing", superAdmin: "full", marketing: "edit", cskh: "none", teacher: "none" },
  { id: "p3", module: "Danh sách khách hàng", superAdmin: "full", marketing: "view", cskh: "edit", teacher: "none" },
  { id: "p4", module: "Ngân sách & Quyền", superAdmin: "full", marketing: "view", cskh: "none", teacher: "none" },
  { id: "p5", module: "Quản lý nhân viên", superAdmin: "full", marketing: "none", cskh: "none", teacher: "none" },
  { id: "p6", module: "Quản lý khóa học", superAdmin: "full", marketing: "view", cskh: "view", teacher: "edit" },
  { id: "p7", module: "Quản lý Leads", superAdmin: "full", marketing: "view", cskh: "edit", teacher: "none" },
  { id: "p8", module: "Báo cáo & Thống kê", superAdmin: "full", marketing: "view", cskh: "view", teacher: "view" },
];

const LEAD_STATUSES: LeadRow["status"][] = ["new", "in-progress", "deposited", "dropped"];

export const LEAD_ROWS: LeadRow[] = Array.from({ length: 20 }, (_, i) => {
  const name = nameAt(i + 5);
  return {
    id: `lead-${i + 1}`,
    name,
    phone: phoneAt(i + 5),
    courseInterest: COURSES[(i + 1) % COURSES.length],
    source: SOURCES[(i + 2) % SOURCES.length],
    status: LEAD_STATUSES[i % LEAD_STATUSES.length],
    assignee: CSKH[(i + 1) % CSKH.length],
    lastContact: `${(i % 12) + 1} giờ trước`,
  };
});

export const REVENUE_TREND: RevenuePoint[] = [
  { month: "T3", revenue: 420, target: 450 },
  { month: "T4", revenue: 468, target: 460 },
  { month: "T5", revenue: 512, target: 480 },
  { month: "T6", revenue: 495, target: 500 },
  { month: "T7", revenue: 560, target: 520 },
  { month: "T8", revenue: 605, target: 550 },
  { month: "T9", revenue: 588, target: 570 },
];

export const STAFF_PERFORMANCE: StaffPerformance[] = [
  { id: "sp1", name: "Nguyễn Thu Hà", leadsHandled: 186, closed: 74, conversionRate: 39.8 },
  { id: "sp2", name: "Trần Minh Quân", leadsHandled: 172, closed: 58, conversionRate: 33.7 },
  { id: "sp3", name: "Lê Bảo Trân", leadsHandled: 164, closed: 41, conversionRate: 25.0 },
];
