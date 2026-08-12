import { Zap, BookOpen, GraduationCap, Clock } from 'lucide-react';

const courses = [
  {
    icon: Zap,
    title: 'Gói A – Cấp tốc (Sprint)',
    duration: '3 tháng',
    badge: 'Gấp',
    description: 'Tập trung vào chứng chỉ TOEIC 2 kỹ năng hoặc 4 kỹ năng dành cho những người cần chứng chỉ gấp và đã có nền tảng.',
    features: ['Luyện thi tập trung', 'Nền tảng đã có', 'Đạt mục tiêu nhanh'],
  },
  {
    icon: BookOpen,
    title: 'Gói B – Lộ trình chuẩn',
    duration: '3–6 tháng',
    badge: 'Cốt lõi',
    description: 'Đào tạo TOEIC hoặc IELTS, giúp học viên củng cố nền tảng và luyện thi hệ thống.',
    features: ['Củng cố nền tảng', 'Luyện thi hệ thống', 'Lộ trình bài bản'],
  },
  {
    icon: GraduationCap,
    title: 'Gói C – Dài hạn toàn diện',
    duration: '6–12 tháng',
    badge: 'Toàn diện',
    description: 'Kết hợp giữa luyện thi chứng chỉ (TOEIC/IELTS) và tiếng Anh giao tiếp dành cho người muốn phát triển năng lực ngôn ngữ bền vững.',
    features: ['Luyện thi + Giao tiếp', 'Phát triển bền vững', 'Năng lực toàn diện'],
  },
];

const cardDelays = ['', 'anim-delay-100', 'anim-delay-200'];

export default function Courses() {
  return (
    <section id="cac-khoa-hoc" className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto container-px">

        {/* Fade In — section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold">
            Các khóa học
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight text-balance">
            Lộ trình đào tạo phù hợp với mọi nhu cầu
          </h2>
          <p
            data-anim="fade"
            className="scroll-hidden mt-4 text-ink-600 text-lg leading-relaxed anim-delay-150"
          >
            Trung tâm định hướng phát triển 3 dòng sản phẩm chính dựa trên tốc độ và nhu cầu của người học
          </p>
        </div>

        {/* Course packages — Fade In stagger */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {courses.map((course, index) => (
            <div
              key={course.title}
              data-anim="fade"
              className={`scroll-hidden bg-gradient-to-br from-ink-50 to-white rounded-[20px] p-8 ring-1 ring-ink-100 hover:shadow-xl hover:-translate-y-1 transition-all ${cardDelays[index]}`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="grid place-items-center w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-lg shadow-brand-500/30">
                  <course.icon className="w-7 h-7" />
                </span>
                <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold">
                  {course.badge}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-ink-900 mb-2">{course.title}</h3>
              <div className="flex items-center gap-2 text-sm text-brand-600 font-semibold mb-3">
                <Clock className="w-4 h-4" />
                {course.duration}
              </div>
              <p className="text-ink-600 text-sm leading-relaxed mb-4">{course.description}</p>
              <ul className="space-y-2">
                {course.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-ink-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
