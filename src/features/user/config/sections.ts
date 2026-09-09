// HỢP ĐỒNG SECTION-ID — nguồn chân lý duy nhất cho menu Header, scroll-spy, smooth-scroll.
// Đã cập nhật khớp docs/design export/code.html (2026-09-09): id/nhãn lấy verbatim từ export.

export interface SectionDef {
  id: string;
  /** Nhãn menu Header; null = anchor nội bộ, không có mục menu. */
  nav: string | null;
}

export const SECTIONS: readonly SectionDef[] = [
  { id: 'top', nav: null },
  { id: 've-chung-toi', nav: 'Về chúng tôi' },
  { id: 'lo-trinh-hoc', nav: 'Lộ trình học' },
  { id: 'quy-trinh', nav: 'Quy trình 3 bước' },
  { id: 'doi-ngu', nav: 'Đội ngũ giáo viên' },
  { id: 'cam-nhan-hoc-vien', nav: 'Cảm nhận học viên' },
  { id: 'cam-ket', nav: 'Cam kết đầu ra' },
  { id: 'faq', nav: 'FAQ' },
  { id: 'dang-ky', nav: null },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

/** id neo tới form Lead ở Hero. */
export const LEAD_ANCHOR_ID: SectionId = 'dang-ky';

const byId = new Map(SECTIONS.map((s) => [s.id, s]));

export function getSection(id: string): SectionDef | undefined {
  return byId.get(id);
}

export function navSections(): SectionDef[] {
  return SECTIONS.filter((s) => s.nav);
}

/** Toàn bộ id để useScrollSpy quan sát (trừ 'top'). */
export const SPY_IDS: string[] = SECTIONS.filter((s) => s.id !== 'top').map((s) => s.id);
