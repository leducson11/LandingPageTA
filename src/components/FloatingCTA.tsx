import { useEffect, useState } from "react";
import { ArrowRight, ArrowUp, X } from "lucide-react";
import { scrollToHash } from "@/lib/useSmoothScroll";

/**
 * FloatingCTA
 * -----------
 * Nhóm nút nổi cố định góc dưới phải, gồm:
 *  - Back to Top: cuộn về đầu trang mượt
 *  - Đăng ký học thử: cuộn xuống form đăng ký
 * Cả hai xuất hiện sau khi cuộn qua 400px.
 * Nút ✕ ẩn cả nhóm khi người dùng không muốn thấy.
 */
export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div
      className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3 animate-fade-up"
      role="complementary"
      aria-label="Điều hướng nhanh"
    >
      {/* Back to Top */}
      <button
        onClick={() => scrollToHash("#top")}
        aria-label="Về đầu trang"
        className="grid place-items-center w-11 h-11 rounded-full bg-white text-brand-600 shadow-xl ring-1 ring-ink-100 hover:-translate-y-0.5 transition-all"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg,#6d28d9,#14b8a6)';
          (e.currentTarget as HTMLElement).style.color = 'white';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = 'white';
          (e.currentTarget as HTMLElement).style.color = '#6d28d9';
        }}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Đăng ký + Dismiss */}
      <div className="flex items-center gap-2">
        <a
          href="#dang-ky"
          onClick={(e) => {
            e.preventDefault();
            scrollToHash("#dang-ky");
          }}
          className="btn-g3 group inline-flex items-center gap-2 px-5 py-3.5 text-white text-sm font-semibold transition-all cta-pulse"
        >
          Đăng ký học thử miễn phí
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>

        <button
          onClick={() => setDismissed(true)}
          aria-label="Ẩn nút đăng ký"
          className="grid place-items-center w-8 h-8 rounded-full bg-white text-ink-500 shadow-lg ring-1 ring-ink-100 hover:text-ink-800 hover:bg-ink-50 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
