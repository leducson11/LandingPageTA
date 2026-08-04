/**
 * useScrollAnimation
 * ------------------
 * Dùng IntersectionObserver để theo dõi các phần tử có class `scroll-hidden`.
 * Khi phần tử đi vào viewport, hook thêm class animation tương ứng vào
 * (animate-fade-in | animate-fly-right | animate-bounce-cta) dựa trên
 * data-attribute `data-anim` của phần tử.
 *
 * Cách dùng trong JSX:
 *   <p data-anim="fade"  className="scroll-hidden">...</p>
 *   <img data-anim="fly" className="scroll-hidden" />
 *   <a  data-anim="bounce" className="scroll-hidden cta-pulse">...</a>
 *
 * Gọi hook một lần duy nhất trong App.tsx hoặc từng component.
 *
 * SEO-safe: nội dung HTML vẫn hiển thị đầy đủ trong DOM (opacity: 0),
 * crawler đọc được toàn bộ text — chỉ hiệu ứng hiển thị là bị delay.
 */
import { useEffect } from 'react';

const ANIM_CLASS: Record<string, string> = {
  fade:   'animate-fade-in',
  fly:    'animate-fly-right',
  bounce: 'animate-bounce-cta',
};

export function useScrollAnimation(rootMargin = '0px 0px -60px 0px'): void {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.scroll-hidden');

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          const animType = el.dataset.anim ?? 'fade';
          const animClass = ANIM_CLASS[animType] ?? ANIM_CLASS.fade;

          el.classList.add(animClass);

          // Dọn observer sau khi đã kích hoạt — mỗi phần tử chỉ animate 1 lần
          observer.unobserve(el);
        });
      },
      {
        rootMargin,   // kích hoạt trước khi phần tử chạm đáy viewport 60px
        threshold: 0.12,
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  // Chạy lại nếu route thay đổi (SPA), hiện tại chỉ cần 1 lần
  }, []);
}
