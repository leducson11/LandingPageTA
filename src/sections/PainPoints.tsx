import { useState } from "react";
import { ChevronDown, Clock, BookOpen, TrendingDown, MessageSquareWarning, BrainCircuit, CalendarX2 } from "lucide-react";

const pains = [
  {
    icon: Clock,
    title: "Học mãi không lên band",
    desc: "Tự học nhiều tháng, làm hàng trăm bài test nhưng điểm Speaking, Writing vẫn dậm chân tại 5.5 - 6.0.",
    solution: "Lộ trình cá nhân hóa dựa trên điểm yếu thực tế, giáo viên 8.0+ chấm chữa chi tiết từng câu, giúp bạn tiến bộ rõ rệt mỗi tuần.",
    image: "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: BrainCircuit,
    title: "Không biết tự sửa lỗi",
    desc: "Không ai chỉ ra lỗi sai cụ thể trong bài viết, bài nói của mình để khắc phục và tiến bộ.",
    solution: "AI chấm chữa 24/7 và giáo viên 1-1 phân tích lỗi chi tiết, đưa ra cách khắc phục cụ thể cho từng bài làm.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: CalendarX2,
    title: "Lịch học bận rộn",
    desc: "Đi làm, đi học nên khó sắp xếp giờ cố định. Cần linh hoạt học mọi lúc, mọi nơi.",
    solution: "Hệ thống đặt lịch linh hoạt, học online mọi lúc mọi nơi, tái phát video bài học không giới hạn.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: TrendingDown,
    title: "Thi nhiều lần tốn tiền",
    desc: "Mỗi lần thi IELTS/TOEIC tốn hàng triệu đồng. Thi trượt nhiều lần vừa tốn tiền vừa mất động lực.",
    solution: "Cam kết đầu ra bằng văn bản: hoàn tiền 100% hoặc học lại miễn phí nếu không đạt mục tiêu sau khóa học.",
    image: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: BookOpen,
    title: "Tài liệu loạn, không lộ trình",
    desc: "Săn tài liệu khắp mạng nhưng không biết học cái gì trước, cái gì sau, học dở dang.",
    solution: "Lộ trình học tập có hệ thống, tài liệu chuẩn được biên soạn riêng, học đúng thứ tự từ nền tảng đến nâng cao.",
    image: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: MessageSquareWarning,
    title: "Sợ Speaking, Writing",
    desc: "Ngại giao tiếp, không có môi trường thực hành. Viết sai ngữ pháp nhưng không được sửa.",
    solution: "Lớp học nhỏ 4-8 người, giáo viên tạo môi trường an toàn để thực hành, chấm chữa chi tiết từng lỗi.",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const staggerDelays = ["", "anim-delay-100", "anim-delay-200", "anim-delay-100", "anim-delay-200", "anim-delay-300"];

export default function PainPoints() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 lg:py-28 bg-ink-50">
      <div className="max-w-7xl mx-auto container-px">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-sm font-semibold">
            Thực trạng & Nỗi đau
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight text-balance">
            Bạn có đang gặp những tình cảnh này?
          </h2>
          <p
            data-anim="fade"
            className="scroll-hidden mt-4 text-ink-600 text-lg anim-delay-150"
          >
            Rất nhiều học viên đến với Huyway English trong trạng thái chán nản, mất phương hướng.
            Nếu bạn thấy mình trong những mô tả dưới đây — đừng lo, giải pháp ở ngay phía dưới.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {pains.map((p, i) => {
            const Icon = p.icon;
            const isOpen = openIndex === i;

            return (
              <div
                key={p.title}
                data-anim="fade"
                className={`scroll-hidden group bg-white rounded-[20px] ring-1 ring-ink-100 hover:ring-brand-200 hover:shadow-xl transition-all duration-300 ${staggerDelays[i]}`}
              >
                {/* Toàn bộ Card có thể bấm để đóng mở */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-left p-6 flex items-start gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-100 transition-colors">
                    <Icon className="w-6 h-6" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-bold text-ink-900">{p.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">{p.desc}</p>
                  </div>
                  {/* ICON MŨI TÊN: Đã sửa class xoay chuẩn Tailwind độc lập */}
                  <span 
                    className={`grid place-items-center w-8 h-8 shrink-0 rounded-full bg-ink-50 text-ink-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-brand-50 text-brand-600" : ""
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </button>

                {/* VÙNG GIẢI PHÁP: Chuyển sang dùng max-h phối hợp transition mượt mà */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 space-y-4">
                    <div className="pt-4 border-t border-ink-100">
                      <p className="text-sm font-bold text-brand-700">Giải pháp từ Huyway English:</p>
                      <p className="mt-2 text-sm text-ink-700 leading-relaxed">{p.solution}</p>
                    </div>
                    <div className="rounded-xl overflow-hidden ring-1 ring-ink-100 shadow-sm">
                      <img
                        src={p.image}
                        alt={`Giải pháp: ${p.title}`}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
