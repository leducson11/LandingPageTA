import { useState } from 'react';
import { ChevronDown, HelpCircle, DollarSign, MapPin, GraduationCap, ShieldCheck } from 'lucide-react';

const faqs = [
  {
    icon: DollarSign,
    q: 'Học phí tại trung tâm là bao nhiêu?',
    a: 'Mức phí dao động từ 200.000 – 300.000 đồng/giờ, thuộc phân khúc trung cấp đến cao cấp tùy vào gói dịch vụ.',
  },
  {
    icon: MapPin,
    q: 'Trung tâm dạy Online hay Offline?',
    a: 'Ưu tiên hình thức Offline hoàn toàn để tạo môi trường gắn bó, hoặc Hybrid (kết hợp cả hai) để linh hoạt cho học viên.',
  },
  {
    icon: GraduationCap,
    q: 'Giáo viên có trình độ như thế nào?',
    a: 'Đội ngũ giảng viên có chứng chỉ IELTS 7.5+ và TOEIC 900+, có kinh nghiệm thực tế quốc tế và khả năng truyền cảm hứng tự học cho học sinh.',
  },
  {
    icon: ShieldCheck,
    q: 'Trung tâm có cam kết đầu ra không?',
    a: 'Có cam kết rõ ràng theo từng nhóm mục tiêu và trình độ đầu vào của học viên.',
  },
];

export default function FAQNew() {
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
                  <div className="flex items-center gap-3">
                    <span className={`grid place-items-center w-10 h-10 shrink-0 rounded-xl transition-all ${isOpen ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-600'}`}>
                      <f.icon className="w-5 h-5" />
                    </span>
                    <span className="font-bold text-ink-900 text-[15px]">{f.q}</span>
                  </div>
                  <span className={`grid place-items-center w-8 h-8 shrink-0 rounded-full transition-all ${isOpen ? 'bg-brand-600 text-white rotate-180' : 'bg-white text-ink-500'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pl-20 text-ink-600 leading-relaxed">{f.a}</p>
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
