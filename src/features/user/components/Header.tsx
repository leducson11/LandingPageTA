import { useEffect, useState } from 'react';
import { BookOpen, Phone } from 'lucide-react';
import { scrollToHash } from '@user/hooks/useSmoothScroll';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
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
      className={`fixed top-11 md:top-14 inset-x-0 z-40 transition-all duration-300 bg-white border-b border-slate-200 ${
        scrolled ? 'shadow-[0_2px_8px_#0000000d]' : ''
        }`}
    >
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between h-20 px-20">
        {/* Logo */}
        <a href="#top" onClick={(e) => go(e, '#top')} className="flex items-center gap-2 group shrink-0">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-blue-600 text-white group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </span>
          <span>
            <span className="text-blue-800 text-xl font-extrabold font-['Inter']">HuyWay</span>
            <span className="text-orange-600 text-xl font-extrabold font-['Inter']">English</span>
          </span>
        </a>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <a href="#l-tr-n-hoc" onClick={(e) => go(e, '#l-tr-n-hoc')} className="text-blue-800 text-base font-semibold font-['Inter']">
            Lộ Trình Học
          </a>
          <a href="#i-ng-gi-o-vi-n" onClick={(e) => go(e, '#i-ng-gi-o-vi-n')} className="text-slate-600 text-base font-medium font-['Inter']">
            Đội Ngũ Giáo Viên
          </a>
          <a href="#c-m-nh-n-hoc-vi-n" onClick={(e) => go(e, '#c-m-nh-n-hoc-vi-n')} className="text-slate-600 text-base font-medium font-['Inter']">
            Cảm Nhận Học Viên
          </a>
          <a href="#v-ch-ng-t-i" onClick={(e) => go(e, '#v-ch-ng-t-i')} className="text-slate-600 text-base font-medium font-['Inter']">
            Về Chúng Tôi
          </a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <a href="tel:0963073488" className="flex items-center gap-2">
            <div className="grid place-items-center w-4 h-4">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <span className="text-slate-900 text-base font-bold font-['Inter']">0963 073 488</span>
          </a>
          <a
            href="#dang-ky"
            onClick={(e) => go(e, '#dang-ky')}
            className="px-5 py-2.5 bg-blue-600 rounded-lg text-white text-sm font-semibold"
          >
            Đăng ký tư vấn
          </a>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        <a href="#top" onClick={(e) => go(e, '#top')} className="flex items-center gap-1.5">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-blue-600">
            <div className="w-4 h-4 bg-white" />
          </span>
          <span>
            <span className="text-blue-800 text-xl font-extrabold font-['Inter']">HuyWay</span>
            <span className="text-orange-600 text-xl font-extrabold font-['Inter']">English</span>
          </span>
        </a>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex items-center gap-1"
          aria-label="Tư vấn"
        >
          <div className="w-4 h-4 bg-blue-600" />
          <span className="text-slate-900 text-xs font-bold font-['Inter']">Tư vấn</span>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-ink-100 shadow-lg max-h-[80vh] overflow-y-auto">
          <nav className="container-px max-w-7xl mx-auto py-3 flex flex-col gap-1">
            {[
              { label: 'Về Huyway English', href: '#ve-huyway' },
              { label: 'Các khóa học', href: '#cac-khoa-hoc' },
              { label: 'Gặp gỡ giảng viên', href: '#gap-gop-giang-vien' },
              { label: 'Nhận xét từ học viên', href: '#hoc-vien' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => go(e, item.href)}
                className="block px-4 py-3 rounded-lg text-ink-700 font-medium hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#dang-ky"
              onClick={(e) => go(e, '#dang-ky')}
              className="btn-g3 mt-2 mx-1 inline-flex items-center justify-center px-5 py-3 text-white text-sm font-semibold"
            >
              Đăng ký học thử miễn phí
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
