import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { scrollToHash } from "@/hooks/useSmoothScroll";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

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
    </div>
  );
}
