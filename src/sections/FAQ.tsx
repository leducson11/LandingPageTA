import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'Học viên mới bắt đầu hoặc mất gốc có theo được không?',
    a: 'Hoàn toàn được. Lộ trình của Huyway English có giai đoạn Foundation dành riêng cho người mất gốc hoặc mới bắt đầu. Giáo viên sẽ đánh giá trình độ và thiết kế lộ trình từ ngữ pháp, từ vựng nền tảng trước khi vào kỹ năng IELTS. Rất nhiều học viên của Huyway English từng bắt đầu từ con số 0 và đạt 6.5 - 7.0+ IELTS.',
  },
  {
    q: 'Chính sách cam kết đầu ra và hoàn tiền thế nào?',
    a: 'Với gói Nâng cao và Combo 1-1, Huyway English cam kết đầu ra bằng văn bản. Nếu học viên hoàn thành đủ 80% lộ trình, làm đủ bài tập và thi thử nhưng chưa đạt band cam kết, Huyway English sẽ cho học lại miễn phí. Riêng gói Combo 1-1, nếu chưa đạt mục tiêu, Huyway English hoàn trả 100% học phí theo điều khoản trong hợp đồng.',
  },
  {
    q: 'Lịch học có linh hoạt không? Tôi đi làm bận có học được không?',
    a: 'Có. Toàn bộ bài giảng được ghi hình sẵn trên nền tảng, bạn có thể học bất cứ lúc nào, ở đâu trên web hoặc app. Lịch kèm 1-1 với giáo viên được linh hoạt sắp xếp theo giờ bạn rảnh, kể cả buổi tối hoặc cuối tuần. Học viên đi làm chiếm hơn 40% cộng đồng Huyway English.',
  },
  {
    q: 'Học online chất lượng có bằng học ở trung tâm không?',
    a: 'Học online tại Huyway English được thiết kế để tối ưu hơn học tại trung tâm: bạn được AI chấm chữa bài tức thì, luyện Speaking không giới hạn, xem lại bài giảng bao nhiêu lần tùy thích. Giáo viên vẫn đồng hành 1-1 qua video call. Nhiều học viên phản hồi học online giúp họ tập trung và chủ động hơn.',
  },
  {
    q: 'Tôi có được học thử trước khi quyết định không?',
    a: 'Có. Khi đăng ký tư vấn, bạn sẽ được test trình độ miễn phí, nhận lộ trình cá nhân hóa và học thử 1 buổi thực tế với giáo viên — hoàn toàn không thu phí. Sau buổi học thử, chuyên gia sẽ tư vấn gói học phù hợp và bạn quyết định có đăng ký hay không.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto container-px">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold">
            <HelpCircle className="w-4 h-4" /> Câu hỏi thường gặp
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight text-balance">
            Bạn còn thắc mắc?
          </h2>
          <p className="mt-4 text-ink-600 text-lg">
            Những câu hỏi Huyway English được hỏi nhiều nhất — nếu chưa đủ, đội ngũ tư vấn luôn sẵn sàng giải đáp.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`rounded-2xl ring-1 transition-all ${
                  isOpen ? 'bg-white ring-brand-200 shadow-md' : 'bg-ink-50 ring-ink-100 hover:ring-brand-200'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-bold text-ink-900 text-[15px]">{f.q}</span>
                  <span className={`grid place-items-center w-8 h-8 shrink-0 rounded-full transition-all ${isOpen ? 'bg-brand-600 text-white rotate-180' : 'bg-white text-ink-500'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-ink-600 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-ink-600">Vẫn chưa có câu trả lời bạn cần?</p>
          <a
            href="#dang-ky"
            className="mt-3 inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-600 text-white font-semibold shadow-lg shadow-brand-500/30 hover:bg-brand-700 hover:-translate-y-0.5 transition-all"
          >
            Đăng ký học thử miễn phí
          </a>
        </div>
      </div>
    </section>
  );
}
