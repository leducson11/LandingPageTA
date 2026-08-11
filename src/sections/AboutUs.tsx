import { Handshake, Lightbulb, Target, Users } from 'lucide-react';

const benefits = [
  {
    title: 'Sứ mệnh và Tầm nhìn',
    badge: 'Định hướng dài hạn',
    summary: 'Huyway English giúp học viên học tiếng Anh theo hướng ứng dụng thực tế...',
    fullSummary: 'Huyway English giúp học viên học tiếng Anh theo hướng ứng dụng thực tế, tự tin giao tiếp và sẵn sàng chinh phục mục tiêu cá nhân.',
    highlights: ['Học để dùng, không chỉ để thi', 'Tạo nền tảng cho tương lai toàn cầu'],
    detail: 'Chúng tôi tin rằng tiếng Anh không chỉ là một chứng chỉ, mà là công cụ để mở ra cơ hội học tập, làm việc và phát triển bản thân.',
    image: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#f5f3ff" />
        <circle cx="180" cy="175" r="100" fill="#6d28d9" opacity="0.16" />
        <circle cx="635" cy="340" r="125" fill="#14b8a6" opacity="0.14" />
        <rect x="140" y="140" width="250" height="190" rx="28" fill="#ffffff" stroke="#ede9fe" stroke-width="6" />
        <path d="M200 220h120" stroke="#29124d" stroke-width="16" stroke-linecap="round" />
        <path d="M200 185h90" stroke="#6d28d9" stroke-width="16" stroke-linecap="round" />
        <path d="M200 255h72" stroke="#14b8a6" stroke-width="16" stroke-linecap="round" />
        <rect x="450" y="175" width="190" height="120" rx="26" fill="#29124d" />
        <path d="M485 245l38-44 34 30 52-68" stroke="#ffffff" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `)}`,
    icon: Target,
  },
  {
    title: 'Giá trị cốt lõi',
    badge: 'Học tập hiệu quả',
    summary: 'Từ tư duy hệ thống, thực hành thực tế đến cá nhân hóa lộ trình, Huyway English...',
    fullSummary: 'Từ tư duy hệ thống, thực hành thực tế đến cá nhân hóa lộ trình, Huyway English luôn đặt chất lượng và trải nghiệm học viên lên hàng đầu.',
    highlights: ['Nền tảng vững chắc', 'Lộ trình riêng cho từng người'],
    detail: 'Mỗi buổi học được thiết kế để học viên hiểu sâu, nhớ lâu và áp dụng linh hoạt trong môi trường thật.',
    image: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#fff3ec" />
        <circle cx="180" cy="165" r="90" fill="#05a6a6" opacity="0.14" />
        <circle cx="610" cy="330" r="115" fill="#6d28d9" opacity="0.13" />
        <rect x="180" y="150" width="220" height="170" rx="24" fill="#ffffff" stroke="#ffe3d4" stroke-width="6" />
        <path d="M220 238c26-42 76-59 120-38" stroke="#05a6a6" stroke-width="16" stroke-linecap="round" />
        <circle cx="245" cy="205" r="20" fill="#29124d" />
        <circle cx="315" cy="228" r="20" fill="#14b8a6" />
        <rect x="440" y="170" width="170" height="140" rx="24" fill="#05a6a6" />
        <path d="M470 240h110" stroke="#fff" stroke-width="14" stroke-linecap="round" />
        <path d="M470 272h70" stroke="#fff" stroke-width="14" stroke-linecap="round" />
      </svg>
    `)}`,
    icon: Lightbulb,
  },
  {
    title: 'Lý do học viên chọn HuyWay',
    badge: 'Tin cậy và đồng hành',
    summary: 'Học viên chọn Huyway English vì môi trường học thân thiện, giáo viên tâm huyết...',
    fullSummary: 'Học viên chọn Huyway English vì môi trường học thân thiện, giáo viên tâm huyết và lộ trình rõ ràng giúp họ tiến bộ từng ngày.',
    highlights: ['Giáo viên tận tâm', 'Cam kết đầu ra rõ ràng'],
    detail: 'Chúng tôi không chỉ dạy kiến thức mà còn đồng hành cùng học viên, giúp họ vượt qua khó khăn và giữ động lực học tập lâu dài.',
    image: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#f5f3ff" />
        <circle cx="185" cy="175" r="95" fill="#29124d" opacity="0.14" />
        <circle cx="625" cy="345" r="120" fill="#05a6a6" opacity="0.12" />
        <rect x="150" y="150" width="240" height="180" rx="24" fill="#ffffff" stroke="#ede9fe" stroke-width="6" />
        <circle cx="230" cy="220" r="38" fill="#6d28d9" />
        <circle cx="295" cy="220" r="30" fill="#14b8a6" />
        <path d="M210 272c18 28 55 38 90 22" stroke="#29124d" stroke-width="14" stroke-linecap="round" />
        <rect x="450" y="170" width="170" height="140" rx="24" fill="#6d28d9" />
        <path d="M490 235c16-18 42-18 58 0" stroke="#ffffff" stroke-width="12" stroke-linecap="round" />
        <path d="M485 275h68" stroke="#ffffff" stroke-width="12" stroke-linecap="round" />
      </svg>
    `)}`,
    icon: Users,
  },
];

export default function AboutUs() {
  return (
    <section id="tai-sao-chon-chung-toi" className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto container-px">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold">
            Tại sao chọn chúng tôi
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight text-balance">
            Huyway English — nơi tiếng Anh trở thành công cụ để tiến xa
          </h2>
          <p className="mt-4 text-ink-600 text-lg leading-relaxed">
            Chúng tôi kết hợp lộ trình học cá nhân hóa, giáo viên tận tâm và môi trường học thực tế để mỗi học viên đều có thể thấy tiến bộ rõ rệt.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col group relative overflow-hidden rounded-[28px] bg-white shadow-lg ring-1 ring-ink-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-48 shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
                  <div className="absolute left-4 right-4 bottom-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-700 backdrop-blur">
                      <Icon className="w-3.5 h-3.5" />
                      {item.badge}
                    </span>
                    <h3 className="mt-3 text-xl font-extrabold text-white">{item.title}</h3>
                  </div>
                </div>

                <div className="flex-1 p-6">
                  <p className="text-sm leading-7 text-ink-600">{item.summary}</p>
                  <ul className="mt-4 space-y-2">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2 text-sm text-ink-700">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-500" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="absolute inset-0 overflow-y-auto flex items-center justify-center bg-brand-700/95 p-6 text-center text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <div>
                    <p className="text-sm leading-7">{item.fullSummary}</p>
                    <p className="mt-3 text-sm leading-7">{item.detail}</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold">
                      <Handshake className="w-4 h-4" />
                      Huyway English
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
