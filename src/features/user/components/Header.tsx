// MODULE 1: HEADER — port 1:1 từ docs/design export/code.html (TopBar cam đã bỏ theo thiết kế gốc).
export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-hairline/70 shadow-sm transition-all">
      <div className="h-[90px] max-w-[1240px] mx-auto px-space-20 md:px-space-32 flex items-center justify-between gap-space-24">
        {/* Logo Brand */}
        <a className="flex items-center gap-space-12 group flex-shrink-0" href="#top">
          <div className="w-11 h-11 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline text-[22px] font-bold shadow-sm group-hover:scale-105 transition-transform">
            H
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-title-lg text-primary tracking-tight font-bold group-hover:text-indigo-hover transition-colors">HuyWay English</span>
            <span className="text-label-sm font-label-sm text-ink-muted tracking-wide">IELTS &amp; Academic Core</span>
          </div>
        </a>
        {/* Navigation */}
        <nav className="hidden xl:flex items-center gap-space-32">
          <a className="text-on-surface-variant hover:text-primary transition-colors text-label-lg font-label-lg py-2" href="#ve-chung-toi">Về chúng tôi</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-label-lg font-label-lg py-2" href="#lo-trinh-hoc">Lộ trình học</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-label-lg font-label-lg py-2" href="#quy-trinh">Quy trình 3 bước</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-label-lg font-label-lg py-2" href="#doi-ngu">Đội ngũ giáo viên</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-label-lg font-label-lg py-2" href="#cam-nhan-hoc-vien">Cảm nhận học viên</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-label-lg font-label-lg py-2" href="#cam-ket">Cam kết đầu ra</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-label-lg font-label-lg py-2" href="#faq">FAQ</a>
        </nav>
        {/* Header Actions (Hotline tinh giản 1 icon + số, nút phụ Indigo) */}
        <div className="flex items-center gap-space-20 flex-shrink-0">
          <a className="hidden sm:flex items-center gap-space-8 text-on-surface-variant hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-indigo-wash/60" href="tel:0963073488">
            <span className="material-symbols-outlined text-[20px] text-primary">call</span>
            <span className="font-label-lg text-label-lg font-semibold tracking-wide">0963 073 488</span>
          </a>
          <a className="inline-flex items-center justify-center bg-primary-container hover:bg-indigo-hover text-on-primary px-space-24 py-[11px] rounded-xl text-label-lg font-label-lg transition-all shadow-sm hover:shadow active:scale-95" href="#dang-ky">
            Đăng ký tư vấn
          </a>
        </div>
      </div>
    </header>
  );
}
