export type ContentStatus = "published" | "draft";

export interface FieldSchema {
  key: string;
  label: string;
  type: "text" | "textarea";
}

interface BlockMeta {
  id: string;
  name: string;
  status: ContentStatus;
  updatedAt: string;
  updatedBy: string;
}

export interface FormBlock extends BlockMeta {
  kind: "form";
  description: string;
  fields: FieldSchema[];
  values: Record<string, string>;
}

export interface ListBlock extends BlockMeta {
  kind: "list";
  description: string;
  itemLabel: string;
  fields: FieldSchema[];
  items: Record<string, string>[];
}

export type LandingBlock = FormBlock | ListBlock;

export const INITIAL_LANDING_BLOCKS: LandingBlock[] = [
  {
    id: "hero",
    kind: "form",
    name: "Hero Banner",
    description: "Tiêu đề, mô tả và nút kêu gọi hành động đầu trang landing page.",
    status: "published",
    updatedAt: "05/09/2026",
    updatedBy: "Admin HuyWay",
    fields: [
      { key: "headline", label: "Tiêu đề chính", type: "text" },
      { key: "subheadline", label: "Mô tả phụ", type: "textarea" },
      { key: "ctaText", label: "Nội dung nút CTA", type: "text" },
      { key: "ctaLink", label: "Liên kết nút CTA", type: "text" },
      { key: "backgroundImage", label: "Ảnh nền (URL / mô tả)", type: "text" },
    ],
    values: {
      headline: "Chinh phục IELTS cùng HuyWay English",
      subheadline: "Lộ trình cá nhân hóa, cam kết đầu ra bằng văn bản, đồng hành cùng hơn 1.200 học viên.",
      ctaText: "Đăng ký tư vấn miễn phí",
      ctaLink: "/dang-ky",
      backgroundImage: "hero-banner-ielts-camp.jpg",
    },
  },
  {
    id: "trust-bar",
    kind: "list",
    name: "Trust Bar",
    description: "Dải số liệu / chứng nhận tạo độ tin cậy ngay dưới Hero.",
    status: "published",
    updatedAt: "03/09/2026",
    updatedBy: "Phạm Gia Bảo",
    itemLabel: "chỉ số",
    fields: [
      { key: "value", label: "Số liệu", type: "text" },
      { key: "label", label: "Mô tả", type: "text" },
    ],
    items: [
      { value: "1.200+", label: "Học viên đã theo học" },
      { value: "8 năm", label: "Kinh nghiệm đào tạo IELTS" },
      { value: "7.5+", label: "Điểm IELTS trung bình đầu ra" },
      { value: "98%", label: "Học viên hài lòng" },
    ],
  },
  {
    id: "pain-points",
    kind: "list",
    name: "Pain Points",
    description: "Những nỗi trăn trở của học viên mà khóa học giải quyết.",
    status: "published",
    updatedAt: "01/09/2026",
    updatedBy: "Phạm Gia Bảo",
    itemLabel: "nỗi đau",
    fields: [
      { key: "title", label: "Tiêu đề", type: "text" },
      { key: "description", label: "Mô tả", type: "textarea" },
    ],
    items: [
      { title: "Mất gốc, không biết bắt đầu từ đâu", description: "Chương trình xây nền tảng bài bản từ phát âm đến ngữ pháp." },
      { title: "Học mãi không tăng band điểm", description: "Chấm chữa bài Speaking/Writing 1-kèm-1 theo checklist giám khảo." },
      { title: "Không có thời gian đến lớp cố định", description: "Lịch học linh hoạt sáng/tối, học bù không giới hạn." },
    ],
  },
  {
    id: "course-roadmap",
    kind: "list",
    name: "Lộ trình khóa học",
    description: "Các giai đoạn học tương ứng với band điểm mục tiêu.",
    status: "published",
    updatedAt: "30/08/2026",
    updatedBy: "Admin HuyWay",
    itemLabel: "giai đoạn",
    fields: [
      { key: "step", label: "Giai đoạn", type: "text" },
      { key: "title", label: "Tên giai đoạn", type: "text" },
      { key: "description", label: "Mô tả", type: "textarea" },
    ],
    items: [
      { step: "01", title: "Xây nền tảng (0 → 4.5)", description: "Phát âm, 800 từ vựng lõi, ngữ pháp căn bản." },
      { step: "02", title: "Phát triển kỹ năng (4.5 → 6.0)", description: "4 kỹ năng Nghe Nói Đọc Viết theo dạng đề thi thật." },
      { step: "03", title: "Luyện đề & tăng tốc (6.0 → 7.5+)", description: "Giải đề dưới áp lực thời gian, chữa lỗi chuyên sâu." },
    ],
  },
  {
    id: "teacher-team",
    kind: "list",
    name: "Đội ngũ giáo viên",
    description: "Hồ sơ giảng viên hiển thị trên landing page.",
    status: "published",
    updatedAt: "28/08/2026",
    updatedBy: "Admin HuyWay",
    itemLabel: "giáo viên",
    fields: [
      { key: "name", label: "Họ tên", type: "text" },
      { key: "role", label: "Chức danh", type: "text" },
      { key: "bio", label: "Giới thiệu ngắn", type: "textarea" },
    ],
    items: [
      { name: "Lưu Tiến Huy", role: "Founder & Giáo viên chính", bio: "8.5 IELTS Overall, 8 năm luyện thi IELTS chuyên sâu." },
      { name: "Vũ Hoài Nam", role: "Giáo viên IELTS Speaking", bio: "Cựu giám khảo chấm thi nội bộ, chuyên trị phát âm & phản xạ." },
    ],
  },
  {
    id: "testimonials",
    kind: "list",
    name: "Testimonials",
    description: "Cảm nhận thực tế từ học viên đã đạt mục tiêu đầu ra.",
    status: "draft",
    updatedAt: "27/08/2026",
    updatedBy: "Phạm Gia Bảo",
    itemLabel: "cảm nhận",
    fields: [
      { key: "name", label: "Tên học viên", type: "text" },
      { key: "result", label: "Kết quả đạt được", type: "text" },
      { key: "content", label: "Nội dung cảm nhận", type: "textarea" },
    ],
    items: [
      { name: "Nguyễn Minh Anh", result: "5.5 → 7.0 sau 4 tháng", content: "Lộ trình rất sát đề thi thật, giáo viên chữa bài kỹ từng câu." },
      { name: "Trần Bảo Châu", result: "6.0 → 7.5", content: "Học phí hợp lý, cam kết đầu ra rõ ràng nên yên tâm học." },
    ],
  },
  {
    id: "faq",
    kind: "list",
    name: "Câu hỏi thường gặp",
    description: "Giải đáp thắc mắc phổ biến trước khi khách đăng ký.",
    status: "published",
    updatedAt: "20/08/2026",
    updatedBy: "Admin HuyWay",
    itemLabel: "câu hỏi",
    fields: [
      { key: "question", label: "Câu hỏi", type: "text" },
      { key: "answer", label: "Câu trả lời", type: "textarea" },
    ],
    items: [
      { question: "Học mất gốc có theo kịp không?", answer: "Có lộ trình riêng bắt đầu từ 0, không cần nền tảng trước đó." },
      { question: "Không đạt đầu ra thì sao?", answer: "Học viên được học bổ sung miễn phí đến khi đạt mục tiêu cam kết." },
    ],
  },
  {
    id: "outcome-commitment",
    kind: "list",
    name: "Cam kết đầu ra",
    description: "Các điều khoản cam kết chất lượng gửi tới học viên.",
    status: "published",
    updatedAt: "18/08/2026",
    updatedBy: "Admin HuyWay",
    itemLabel: "cam kết",
    fields: [{ key: "item", label: "Nội dung cam kết", type: "textarea" }],
    items: [
      { item: "Cam kết bằng văn bản đạt band điểm mục tiêu hoặc học lại miễn phí." },
      { item: "Hoàn 50% học phí nếu không đạt đầu ra sau khi học đủ lộ trình." },
      { item: "Giáo viên đồng hành xuyên suốt, không đổi lớp giữa khóa." },
    ],
  },
  {
    id: "social-links",
    kind: "list",
    name: "Social links",
    description: "Liên kết mạng xã hội hiển thị ở Hero và Footer.",
    status: "published",
    updatedAt: "15/08/2026",
    updatedBy: "Phạm Gia Bảo",
    itemLabel: "liên kết",
    fields: [
      { key: "platform", label: "Nền tảng", type: "text" },
      { key: "url", label: "Đường dẫn", type: "text" },
    ],
    items: [
      { platform: "Facebook", url: "https://facebook.com/huywayenglish" },
      { platform: "TikTok", url: "https://tiktok.com/@huywayenglish" },
      { platform: "YouTube", url: "https://youtube.com/@huywayenglish" },
    ],
  },
  {
    id: "hotline-email",
    kind: "form",
    name: "Hotline / Email",
    description: "Thông tin liên hệ trực tiếp hiển thị trên toàn trang.",
    status: "published",
    updatedAt: "15/08/2026",
    updatedBy: "Admin HuyWay",
    fields: [
      { key: "hotline", label: "Số Hotline", type: "text" },
      { key: "email", label: "Email liên hệ", type: "text" },
      { key: "workingHours", label: "Giờ làm việc", type: "text" },
    ],
    values: {
      hotline: "1900 6868",
      email: "hotro@huyway.edu.vn",
      workingHours: "8:00 - 21:00, Thứ 2 - Chủ nhật",
    },
  },
];
