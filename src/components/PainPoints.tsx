import { Clock, BookOpen, TrendingDown, MessageSquareWarning, BrainCircuit, CalendarX2 } from 'lucide-react';

const pains = [
  {
    icon: Clock,
    title: 'Học mãi không lên band',
    desc: 'Tự học nhiều tháng, làm hàng trăm bài test nhưng điểm Speaking, Writing vẫn dậm chân tại 5.5 - 6.0.',
  },
  {
    icon: BrainCircuit,
    title: 'Không biết tự sửa lỗi',
    desc: 'Không ai chỉ ra lỗi sai cụ thể trong bài viết, bài nói của mình để khắc phục và tiến bộ.',
  },
  {
    icon: CalendarX2,
    title: 'Lịch học bận rộn',
    desc: 'Đi làm, đi học nên khó sắp xếp giờ cố định. Cần linh hoạt học mọi lúc, mọi nơi.',
  },
  {
    icon: TrendingDown,
    title: 'Thi nhiều lần tốn tiền',
    desc: 'Mỗi lần thi IELTS/TOEIC tốn hàng triệu đồng. Thi trượt nhiều lần vừa tốn tiền vừa mất động lực.',
  },
  {
    icon: BookOpen,
    title: 'Tài liệu loạn, không lộ trình',
    desc: 'Săn tài liệu khắp mạng nhưng không biết học cái gì trước, cái gì sau, học dở dang.',
  },
  {
    icon: MessageSquareWarning,
    title: 'Sợ Speaking, Writing',
    desc: 'Ngại giao tiếp, không có môi trường thực hành. Viết sai ngữ pháp nhưng không được sửa.',
  },
];

export default function PainPoints() {
  return (
    <section className="relative py-20 lg:py-28 bg-ink-50">
      <div className="max-w-7xl mx-auto container-px">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-100 text-accent-700 text-sm font-semibold">
            Thực trạng & Nỗi đau
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight text-balance">
            Bạn có đang gặp những tình cảnh này?
          </h2>
          <p className="mt-4 text-ink-600 text-lg">
            Rất nhiều học viên đến với HuyWay trong trạng thái chán nản, mất phương hướng.
            Nếu bạn thấy mình trong những mô tả dưới đây — đừng lo, giải pháp ở ngay phía dưới.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pains.map((p, i) => (
            <div
              key={p.title}
              className="group bg-white rounded-2xl p-6 ring-1 ring-ink-100 hover:ring-accent-200 hover:shadow-xl hover:-translate-y-1 transition-all"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-4">
                <span className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-accent-50 text-accent-600 group-hover:bg-accent-100 transition-colors">
                  <p.icon className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="font-bold text-ink-900">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
