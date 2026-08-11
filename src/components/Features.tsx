import { useState } from 'react';
import { CheckCircle2, ChevronRight, GraduationCap, PenLine, Mic, Headphones, BookOpen, BarChart3 } from 'lucide-react';

const modules = [
  {
    icon: BookOpen,
    name: 'Foundation',
    level: 'Band 3.0 - 4.5',
    duration: '4 tuần',
    color: 'from-teal-500 to-teal-400',
    desc: 'Xây nền tảng ngữ pháp, từ vựng cốt lõi và phát âm chuẩn. Dành cho người mới bắt đầu hoặc mất gốc.',
    lessons: ['Ngữ pháp nền tảng 12 thì', 'Từ vựng 1000+ theo chủ đề', 'Luyện phát âm chuẩn IPA', 'Kỹ năng đọc hiểu cơ bản'],
  },
  {
    icon: PenLine,
    name: 'Skill Building',
    level: 'Band 4.5 - 5.5',
    duration: '6 tuần',
    color: 'from-brand-600 to-brand-400',
    desc: 'Làm chủ 4 kỹ năng Listening, Reading, Writing, Speaking qua từng dạng bài tập trung.',
    lessons: ['Listening các dạng câu hỏi', 'Reading skimming & scanning', 'Writing Task 1 & Task 2', 'Speaking Part 1, 2, 3'],
  },
  {
    icon: BarChart3,
    name: 'Intensive',
    level: 'Band 5.5 - 6.5',
    duration: '6 tuần',
    color: 'from-accent-500 to-accent-400',
    desc: 'Luyện đề chuyên sâu, chiến thuật làm bài theo thời gian thực, nâng band bằng tips từ giám khảo.',
    lessons: ['20+ bộ đề Cambridge', 'Chiến thuật phân bổ thời gian', 'Tips nâng band Writing/Speaking', 'Luyện Speaking với AI'],
  },
  {
    icon: GraduationCap,
    name: 'Mock Test & Cảm chiến',
    level: 'Band 6.5 - 7.5+',
    duration: '4 tuần',
    color: 'from-azure-600 to-azure-500',
    desc: 'Thi thử chuẩn như thi thật, được chấm và chữa chi tiết. Tự tin bước vào phòng thi thực tế.',
    lessons: ['10+ lần thi thử đầy đủ', 'Chấm chữa Writing/Speaking 1-1', 'Tâm lý & kỹ năng phòng thi', 'Cam kết đầu ra bằng văn bản'],
  },
];

const features = [
  { icon: Mic, text: 'Luyện Speaking với AI chấm điểm & sửa phát âm' },
  { icon: PenLine, text: 'Chữa Writing chi tiết từng câu, từng lỗi' },
  { icon: Headphones, text: 'Thư viện 500+ bài Listening kèm transcript' },
  { icon: BarChart3, text: 'Dashboard tiến độ & dự báo band điểm' },
  { icon: GraduationCap, text: 'Giáo viên 8.0+ IELTS đồng hành 1-1' },
  { icon: CheckCircle2, text: 'Cam kết đầu ra — không đạt học lại free' },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const mod = modules[active];

  return (
    <section id="noi-dung" className="relative py-20 lg:py-28 bg-gradient-to-b from-ink-50 to-white">
      <div className="max-w-7xl mx-auto container-px">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold">
            Nội dung chi tiết
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight text-balance">
            4 giai đoạn — từ con số 0 đến 7.5+ IELTS
          </h2>
          <p className="mt-4 text-ink-600 text-lg">
            Lộ trình 20 tuần được thiết kế chuẩn theo khung Cambridge, chia nhỏ mục tiêu để bạn luôn thấy mình đang tiến bộ.
          </p>
        </div>

        {/* tabs */}
        <div className="mt-12 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 flex flex-col gap-3">
            {modules.map((m, i) => (
              <button
                key={m.name}
                onClick={() => setActive(i)}
                className={`text-left rounded-2xl p-5 ring-1 transition-all ${
                  active === i
                    ? 'bg-white ring-brand-300 shadow-lg'
                    : 'bg-white/60 ring-ink-100 hover:ring-brand-200 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${m.color} text-white shadow-md`}>
                    <m.icon className="w-6 h-6" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-ink-900">{m.name}</h3>
                      <span className="text-xs font-semibold text-ink-400">{m.duration}</span>
                    </div>
                    <p className="text-sm text-ink-500 mt-0.5">{m.level}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-all ${active === i ? 'text-brand-600 translate-x-0' : 'text-ink-300 -translate-x-1'}`} />
                </div>
              </button>
            ))}
          </div>

          {/* panel */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[20px] p-7 lg:p-9 ring-1 ring-ink-100 shadow-xl h-full">
              <div className="flex items-center gap-3">
                <span className={`grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} text-white shadow-md`}>
                  <mod.icon className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-ink-900">{mod.name}</h3>
                  <p className="text-sm text-ink-500">{mod.level} · {mod.duration}</p>
                </div>
              </div>
              <p className="mt-5 text-ink-600 leading-relaxed">{mod.desc}</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                {mod.lessons.map((l) => (
                  <li key={l} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* feature grid */}
        <div className="mt-16">
          <h3 className="text-center text-2xl font-extrabold text-ink-900">Công cụ học tập đi kèm</h3>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.text} className="flex items-center gap-3 bg-white rounded-xl p-4 ring-1 ring-ink-100 hover:ring-brand-200 hover:shadow-md transition-all">
                <span className="grid place-items-center w-10 h-10 rounded-lg bg-brand-50 text-brand-600 shrink-0">
                  <f.icon className="w-5 h-5" />
                </span>
                <span className="text-sm font-medium text-ink-700">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
