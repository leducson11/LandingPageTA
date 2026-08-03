import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { scrollToHash } from '@/lib/useSmoothScroll';

/**
 * FloatingCTA
 * -----------
 * Nút đăng ký nổi (fixed bottom-right), xuất hiện sau khi người dùng
 * cuộn qua phần Hero (> 400px). Có thể ẩn đi nếu không muốn xem.
 */
export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div
      className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2 animate-fade-up"
      role="complementary"
      aria-label="Đăng ký học thử miễn phí"
    >
      {/* Nút chính */}
      <a
        href="#dang-ky"
        onClick={(e) => {
          e.preventDefault();
          scrollToHash('#dang-ky');
        }}
        className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-brand-600 text-white text-sm font-semibold shadow-2xl shadow-brand-500/40 hover:bg-brand-700 hover:-translate-y-0.5 hover:shadow-brand-500/50 transition-all"
      >
        Đăng ký học thử miễn phí
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>

      {/* Nút ẩn */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Ẩn nút đăng ký"
        className="grid place-items-center w-8 h-8 rounded-full bg-white text-ink-500 shadow-lg hover:text-ink-800 hover:bg-ink-50 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
