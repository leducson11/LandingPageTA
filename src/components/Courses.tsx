import { Zap, BookOpen, GraduationCap, Clock, Users, Music, Smartphone, Globe, TrendingUp } from 'lucide-react';

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

const futurePlans = [
  {
    icon: TrendingUp,
    title: 'VSTEP (Giai đoạn 2)',
    description: 'Đào tạo chứng chỉ VSTEP',
  },
  {
    icon: Users,
    title: 'Giao tiếp thực tế',
    description: 'Các lớp chuyên sâu giao tiếp',
  },
];

const benefits = [
  {
    icon: Users,
    title: 'Mô hình lớp học nhỏ',
    description: 'Chỉ từ 5–10 học viên, đảm bảo sự tương tác tối đa và giáo viên có thể chăm sóc kỹ lưỡng từng cá nhân.',
  },
  {
    icon: Music,
    title: 'Phương pháp học qua Âm nhạc',
    description: 'Tích hợp âm nhạc vào bài giảng để giúp ghi nhớ từ vựng, luyện ngữ điệu tự nhiên và tạo cảm hứng, tránh sự khô khan của sách vở.',
  },
  {
    icon: BookOpen,
    title: 'Tư duy hệ thống',
    description: 'Không dạy "mẹo" đối phó thi cử mà tập trung vào khả năng sử dụng thực tế và tư duy xử lý ngôn ngữ chủ động.',
  },
  {
    icon: Smartphone,
    title: 'Hệ sinh thái công nghệ',
    description: 'Cung cấp App/Website tự học giúp luyện phản xạ nói, học từ vựng qua bài hát và theo dõi tiến độ cá nhân mọi lúc mọi nơi.',
  },
  {
    icon: Globe,
    title: 'Hỗ trợ du học',
    description: 'Lộ trình tiếp nối từ đào tạo ngôn ngữ đến tư vấn hồ sơ du học và săn học bổng.',
  },
];

export default function Courses() {
  return (
    <section id="cac-khoa-hoc" className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto container-px">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold">
            Các khóa học
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight text-balance">
            Lộ trình đào tạo phù hợp với mọi nhu cầu
          </h2>
          <p className="mt-4 text-ink-600 text-lg leading-relaxed">
            Trung tâm định hướng phát triển 3 dòng sản phẩm chính dựa trên tốc độ và nhu cầu của người học
          </p>
        </div>

        {/* Course packages */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {courses.map((course, index) => (
            <div
              key={course.title}
              className="bg-gradient-to-br from-ink-50 to-white rounded-3xl p-8 ring-1 ring-ink-100 hover:shadow-xl hover:-translate-y-1 transition-all"
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

        {/* Future plans */}
        <div className="bg-gradient-to-r from-accent-50 to-brand-50 rounded-3xl p-8 mb-16">
          <h3 className="text-xl font-extrabold text-ink-900 mb-6 text-center">Dự kiến mở rộng</h3>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {futurePlans.map((plan, index) => (
              <div key={index} className="bg-white rounded-xl p-5 ring-1 ring-ink-100 flex items-start gap-4">
                <span className="grid place-items-center w-10 h-10 shrink-0 rounded-xl bg-brand-100 text-brand-600">
                  <plan.icon className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-bold text-ink-900 text-sm">{plan.title}</h4>
                  <p className="text-xs text-ink-600 mt-1">{plan.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
              Lợi ích khi học tại trung tâm
            </h3>
            <p className="mt-4 text-ink-600 text-lg">
              Học viên sẽ nhận được những giá trị khác biệt mà các trung tâm đại trà chưa chú trọng
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-6 ring-1 ring-ink-100 hover:shadow-lg hover:ring-brand-200 transition-all"
              >
                <span className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-lg shadow-brand-500/30 mb-4">
                  <benefit.icon className="w-6 h-6" />
                </span>
                <h4 className="font-bold text-ink-900 text-base mb-2">{benefit.title}</h4>
                <p className="text-ink-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
