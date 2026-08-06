import { useEffect, useState, useRef } from 'react';
import {
  Menu, X, GraduationCap, ChevronDown,
  Building2, Target, Lightbulb, Users,
  Zap, BookOpen, GraduationCap as GradIcon, Globe,
  Star, MessageCircle,
  HelpCircle, DollarSign, MapPin, ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { scrollToHash } from '@/lib/useSmoothScroll';

/* ─────────────────────────────────────────────
   Cấu hình mega menu — thứ tự khớp với trang:
   Hero → PainPoints → AboutUs → Courses → FAQ → Feedback → LeadForm
───────────────────────────────────────────── */
const megaNav = [
  {
    label: 'Về chúng tôi',
    href: '#ve-chung-toi',
    cols: [
      {
        heading: 'Huyway English',
        items: [
          { icon: Building2,  label: 'Giới thiệu chung',      href: '#ve-chung-toi', desc: 'Lịch sử & đơn vị chủ quản' },
          { icon: Target,     label: 'Sứ mệnh & Tầm nhìn',   href: '#ve-chung-toi', desc: '"Học để dùng, không chỉ để thi"' },
          { icon: Lightbulb,  label: 'Giá trị cốt lõi',       href: '#ve-chung-toi', desc: 'Tư duy hệ thống & sáng tạo' },
          { icon: Users,      label: 'Đội ngũ nhân sự',       href: '#ve-chung-toi', desc: 'Giảng viên IELTS 7.5+' },
        ],
      },
    ],
    highlight: {
      label: '5–10 học viên/lớp',
      desc: 'Lớp học nhỏ — giáo viên chăm từng người',
      badge: 'Điểm khác biệt',
    },
  },
  {
    label: 'Các khóa học',
    href: '#cac-khoa-hoc',
    cols: [
      {
        heading: 'Gói đào tạo',
        items: [
          { icon: Zap,        label: 'Gói A – Cấp tốc',        href: '#cac-khoa-hoc', desc: '3 tháng · Cho người cần gấp' },
          { icon: BookOpen,   label: 'Gói B – Lộ trình chuẩn', href: '#cac-khoa-hoc', desc: '3–6 tháng · Luyện thi bài bản' },
          { icon: GradIcon,   label: 'Gói C – Toàn diện',      href: '#cac-khoa-hoc', desc: '6–12 tháng · Thi + Giao tiếp' },
        ],
      },
      {
        heading: 'Lợi ích nổi bật',
        items: [
          { icon: Users,      label: 'Lớp học nhỏ 5–10 HV',    href: '#cac-khoa-hoc', desc: 'Tương tác tối đa' },
          { icon: BookOpen,   label: 'Học qua âm nhạc',         href: '#cac-khoa-hoc', desc: 'Nhớ từ vựng nhanh, tự nhiên' },
          { icon: Globe,      label: 'Hỗ trợ du học',           href: '#cac-khoa-hoc', desc: 'Tư vấn hồ sơ & học bổng' },
        ],
      },
    ],
    highlight: {
      label: 'Cam kết đầu ra',
      desc: 'Không đạt mục tiêu — học lại miễn phí 100%',
      badge: 'Độc quyền',
    },
  },
  {
    label: 'FAQ',
    href: '#faq',
    cols: [
      {
        heading: 'Câu hỏi thường gặp',
        items: [
          { icon: DollarSign,  label: 'Học phí bao nhiêu?',       href: '#faq', desc: '200K–300K đồng/giờ' },
          { icon: MapPin,      label: 'Online hay Offline?',       href: '#faq', desc: 'Offline & Hybrid linh hoạt' },
          { icon: GradIcon,    label: 'Trình độ giáo viên?',       href: '#faq', desc: 'IELTS 7.5+ · TOEIC 900+' },
          { icon: ShieldCheck, label: 'Có cam kết đầu ra?',        href: '#faq', desc: 'Có — theo từng nhóm mục tiêu' },
        ],
      },
    ],
    highlight: {
      label: 'Tư vấn 1-1 miễn phí',
      desc: 'Gặp chuyên gia, test trình độ & nhận lộ trình riêng',
      badge: 'Hoàn toàn free',
    },
  },
  {
    label: 'Feedback',
    href: '#feedback',
    cols: [
      {
        heading: 'Điều học viên nói',
        items: [
          { icon: Star,          label: 'Lớp học chất lượng',      href: '#feedback', desc: 'Giải quyết vấn đề sĩ số đông' },
          { icon: MessageCircle, label: 'Thay đổi tư duy',          href: '#feedback', desc: '"Học để dùng" thực sự' },
          { icon: Users,         label: 'Giảng viên tâm huyết',     href: '#feedback', desc: 'Hướng dẫn tự học tại nhà' },
          { icon: BookOpen,      label: 'Âm nhạc & từ vựng',        href: '#feedback', desc: 'Nhớ lâu, không còn sợ Speaking' },
        ],
      },
    ],
    highlight: {
      label: 'IELTS 7.5 · TOEIC 850+',
      desc: 'Điểm trung bình học viên sau khoá học',
      badge: 'Kết quả thực tế',
    },
  },
];

/* helper: đóng khi click ngoài */
function useClickOutside(ref: React.RefObject<HTMLElement>, cb: () => void) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, cb]);
}

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null!);
  const hoverTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        window.clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  useClickOutside(navRef, () => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setActiveMenu(null);
  });

  const clearHoverTimer = () => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const openMenu = (label: string) => {
    clearHoverTimer();
    hoverTimerRef.current = window.setTimeout(() => setActiveMenu(label), 140);
  };

  const closeMenu = () => {
    clearHoverTimer();
    hoverTimerRef.current = window.setTimeout(() => setActiveMenu(null), 180);
  };

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    clearHoverTimer();
    setActiveMenu(null);
    setMobileOpen(false);
    scrollToHash(href);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-ink-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto container-px" ref={navRef}>
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a href="#top" onClick={(e) => go(e, '#top')} className="flex items-center gap-2.5 group shrink-0">
            <span
              className="grid place-items-center w-10 h-10 rounded-xl text-white shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg, #448cfd, #ff8de4)' }}
            >
              <GraduationCap className="w-6 h-6" />
            </span>
            <span className="font-extrabold text-lg tracking-tight text-ink-900">
              Huyway <span className="text-brand-600">English</span>
            </span>
          </a>

          {/* ── Desktop mega nav ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {megaNav.map((item) => {
              const isActive = activeMenu === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openMenu(item.label)}
                  onMouseLeave={() => closeMenu()}
                >
                  <button
                    onClick={() => {
                      clearHoverTimer();
                      setActiveMenu(isActive ? null : item.label);
                    }}
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-brand-600 bg-brand-50'
                        : 'text-ink-600 hover:text-brand-600 hover:bg-brand-50'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? 'rotate-180 text-brand-600' : ''}`} />
                  </button>

                  {/* Mega dropdown */}
                  {isActive && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max min-w-[480px] max-w-[640px] bg-white rounded-2xl shadow-2xl ring-1 ring-ink-100 overflow-hidden z-50"
                      style={{ animation: 'fade-in 0.18s ease-out' }}
                    >
                      <div className="flex">
                        {/* Columns */}
                        <div className={`flex-1 p-5 grid gap-4 ${item.cols.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                          {item.cols.map((col) => (
                            <div key={col.heading}>
                              <p className="text-[11px] font-bold text-ink-400 uppercase tracking-widest mb-3 px-1">
                                {col.heading}
                              </p>
                              <ul className="space-y-1">
                                {col.items.map((sub) => (
                                  <li key={sub.label}>
                                    <a
                                      href={sub.href}
                                      onClick={(e) => go(e, sub.href)}
                                      className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-50 group/item transition-colors"
                                    >
                                      <span className="grid place-items-center w-8 h-8 rounded-lg bg-brand-100 text-brand-600 shrink-0 group-hover/item:bg-brand-600 group-hover/item:text-white transition-colors mt-0.5">
                                        <sub.icon className="w-4 h-4" />
                                      </span>
                                      <div>
                                        <p className="text-sm font-semibold text-ink-900 group-hover/item:text-brand-700 leading-tight">
                                          {sub.label}
                                        </p>
                                        <p className="text-xs text-ink-500 mt-0.5">{sub.desc}</p>
                                      </div>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Highlight panel */}
                        <div
                          className="w-44 shrink-0 p-5 flex flex-col justify-between"
                          style={{ background: 'linear-gradient(160deg, #448cfd 0%, #ff8720 55%, #ff8de4 100%)' }}
                        >
                          <div>
                            <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white px-2 py-0.5 rounded-full mb-3">
                              {item.highlight.badge}
                            </span>
                            <p className="text-white font-extrabold text-base leading-snug">
                              {item.highlight.label}
                            </p>
                            <p className="text-brand-100 text-xs mt-2 leading-relaxed">
                              {item.highlight.desc}
                            </p>
                          </div>
                          <a
                            href="#dang-ky"
                            onClick={(e) => go(e, '#dang-ky')}
                            className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-white/90 hover:text-white group/hl"
                          >
                            Đăng ký ngay
                            <ArrowRight className="w-3.5 h-3.5 group-hover/hl:translate-x-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="#dang-ky"
              onClick={(e) => go(e, '#dang-ky')}
              className="btn-g3 inline-flex items-center px-5 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg hover:-translate-y-0.5 transition-all cta-pulse"
            >
              Đăng ký học thử miễn phí
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden grid place-items-center w-10 h-10 rounded-lg text-ink-700 hover:bg-ink-100"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-ink-100 shadow-lg max-h-[80vh] overflow-y-auto">
          <nav className="container-px max-w-7xl mx-auto py-3 flex flex-col gap-1">
            {megaNav.map((item) => {
              const isExpanded = mobileExpanded === item.label;
              return (
                <div key={item.label}>
                  <button
                    onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-ink-700 font-medium hover:bg-brand-50 hover:text-brand-700"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180 text-brand-600' : 'text-ink-400'}`} />
                  </button>

                  {/* Mobile sub-items */}
                  {isExpanded && (
                    <div className="ml-4 mb-2 space-y-1 border-l-2 border-brand-100 pl-3">
                      {item.cols.flatMap((col) => col.items).map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          onClick={(e) => go(e, sub.href)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-ink-600 hover:text-brand-700 hover:bg-brand-50"
                        >
                          <span className="grid place-items-center w-7 h-7 rounded-lg bg-brand-50 text-brand-600 shrink-0">
                            <sub.icon className="w-3.5 h-3.5" />
                          </span>
                          <span className="font-medium">{sub.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile CTA */}
            <a
              href="#dang-ky"
              onClick={(e) => go(e, '#dang-ky')}
              className="btn-g3 mt-2 mx-1 inline-flex items-center justify-center px-5 py-3 rounded-full text-white text-sm font-semibold shadow-md"
            >
              Đăng ký học thử miễn phí
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
