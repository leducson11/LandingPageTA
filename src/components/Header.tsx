import { useEffect, useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';

const navLinks = [
  { label: 'Lợi ích', href: '#loi-ich' },
  { label: 'Nội dung', href: '#noi-dung' },
  { label: 'Học viên', href: '#hoc-vien' },
  { label: 'Bảng giá', href: '#bang-gia' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-ink-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto container-px">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </span>
            <span className={`font-extrabold text-lg tracking-tight ${scrolled ? 'text-ink-900' : 'text-ink-900'}`}>
              Prep<span className="text-brand-600">IELTS</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-ink-600 hover:text-brand-600 transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:h-0.5 after:w-0 after:bg-brand-500 hover:after:w-full after:transition-all"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="#dang-ky" className="text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors">
              Đăng nhập
            </a>
            <a
              href="#dang-ky"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-brand-600 text-white text-sm font-semibold shadow-lg shadow-brand-500/30 hover:bg-brand-700 hover:shadow-brand-500/40 transition-all hover:-translate-y-0.5"
            >
              Nhận tư vấn miễn phí
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid place-items-center w-10 h-10 rounded-lg text-ink-700 hover:bg-ink-100"
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-ink-100 shadow-lg">
          <nav className="container-px max-w-7xl mx-auto py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-ink-700 font-medium hover:bg-brand-50 hover:text-brand-700"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#dang-ky"
              onClick={() => setOpen(false)}
              className="mt-2 mx-4 inline-flex items-center justify-center px-5 py-3 rounded-full bg-brand-600 text-white text-sm font-semibold"
            >
              Nhận tư vấn miễn phí
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
