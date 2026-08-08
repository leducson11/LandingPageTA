import { useEffect, useState } from 'react';
import { Menu, X, GraduationCap, ChevronDown, ArrowRight } from 'lucide-react';
import { scrollToHash } from '@/lib/useSmoothScroll';

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToHash(href);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-ink-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto container-px">
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

          <nav className="hidden lg:flex items-center gap-5 lg:gap-6">
            <a
              href="#tai-sao-chon-chung-toi"
              onClick={(e) => go(e, '#tai-sao-chon-chung-toi')}
              className="text-sm font-medium text-ink-700 hover:text-brand-600 transition-colors"
            >
              Tại sao chọn chúng tôi
            </a>
            <a
              href="#cac-khoa-hoc"
              onClick={(e) => go(e, '#cac-khoa-hoc')}
              className="text-sm font-medium text-ink-700 hover:text-brand-600 transition-colors"
            >
              Các khóa học
            </a>
            <a
              href="#gap-gop-giang-vien"
              onClick={(e) => go(e, '#gap-gop-giang-vien')}
              className="text-sm font-medium text-ink-700 hover:text-brand-600 transition-colors"
            >
              Gặp gỡ giảng viên
            </a>
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
            {['Tại sao chọn chúng tôi', 'Các khóa học', 'Gặp gỡ giảng viên'].map((label) => {
              const href = label === 'Tại sao chọn chúng tôi'
                ? '#tai-sao-chon-chung-toi'
                : label === 'Các khóa học'
                ? '#cac-khoa-hoc'
                : '#gap-gop-giang-vien';
              return (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => go(e, href)}
                  className="block px-4 py-3 rounded-lg text-ink-700 font-medium hover:bg-brand-50 hover:text-brand-700"
                >
                  {label}
                </a>
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
