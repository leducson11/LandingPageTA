import { GraduationCap, Users, Target, Lightbulb, Handshake, Award, Building2, Calendar } from 'lucide-react';

const sections = [
  {
    icon: Building2,
    title: 'Giới thiệu chung',
    content: [
      { label: 'Tên thương hiệu:', value: 'Huyway English' },
      { label: 'Slogan:', value: 'English to go far.' },
      { label: 'Đơn vị chủ quản:', value: 'Công ty Cổ phần Huy Phong' },
      { label: 'Lịch sử hình thành:', value: 'Dự án bắt đầu triển khai mạnh mẽ từ tháng 7/2026, được xây dựng dựa trên sự đam mê kinh doanh, mong muốn phát huy nguồn lực giáo viên tiếng Anh sẵn có và tạo ra giá trị xã hội thông qua giáo dục.' },
      { label: 'Lĩnh vực hoạt động chính:', value: 'Đào tạo tiếng Anh chứng chỉ (TOEIC, IELTS, VSTEP), tiếng Anh giao tiếp chuyên sâu và tư vấn du học.' },
    ],
  },
  {
    icon: Target,
    title: 'Sứ mệnh và Tầm nhìn',
    content: [
      { label: 'Sứ mệnh:', value: 'Thay đổi cách người Việt học tiếng Anh theo hướng "Học để dùng, không chỉ để thi". Trung tâm cam kết mang lại sự tự tin cho học viên khi giao tiếp, giúp họ coi chứng chỉ (như IELTS) là phương tiện để đạt đến đích đến cuối cùng là "đổi đời" và thành công trong môi trường quốc tế.' },
      { label: 'Tầm nhìn:', value: 'Trở thành đơn vị hàng đầu trong việc đào tạo những thế hệ học viên không chỉ giỏi ngôn ngữ mà còn có khả năng làm việc toàn cầu. Định hướng phát triển không dừng lại ở đào tạo ngoại ngữ mà còn mở rộng thành hệ sinh thái hỗ trợ du học toàn diện.' },
    ],
  },
  {
    icon: Lightbulb,
    title: 'Giá trị cốt lõi',
    content: [
      { label: 'Tư duy hệ thống:', value: 'Thay vì học mẹo hay đối phó thi cử, trung tâm tập trung vào việc xây dựng nền tảng vững chắc và tư duy xử lý ngôn ngữ chủ động.' },
      { label: 'Thực hành thực tế:', value: 'Chú trọng khả năng sử dụng ngoại ngữ trong môi trường thực tế và học thuật quốc tế.' },
      { label: 'Cá nhân hóa:', value: 'Lộ trình học được thiết kế riêng biệt, phù hợp với năng lực đầu vào và mục tiêu cấp thiết của từng học viên.' },
      { label: 'Sáng tạo & Cảm hứng:', value: 'Tích hợp âm nhạc vào giảng dạy để giúp học viên ghi nhớ từ vựng, luyện ngữ điệu tự nhiên và tạo sự thích thú trong học tập.' },
    ],
  },
  {
    icon: Users,
    title: 'Đội ngũ nhân sự',
    content: [
      { label: 'Ban lãnh đạo:', value: 'Dự án được dẫn dắt bởi ban lãnh đạo Công ty Huy Phong (như PGĐ Bùi Thị Nhân Huệ) phối hợp cùng đội ngũ chuyên gia công nghệ giàu kinh nghiệm.' },
      { label: 'Đội ngũ giảng viên:', value: 'Sở hữu trình độ chuyên môn cao (IELTS từ 7.5 trở lên đối với các lớp luyện thi). Có tư duy vĩ mô, khả năng sư phạm tâm huyết, không chỉ dạy kiến thức mà còn biết cách truyền cảm hứng và hướng dẫn học viên tự nghiên cứu tại nhà. Giảng viên đóng vai trò là người đồng hành, trực tiếp tương tác và can thiệp kịp thời vào tiến độ của học viên.' },
    ],
  },
  {
    icon: Award,
    title: 'Thành tựu và Đối tác',
    content: [
      { label: 'Đối tác chiến lược:', value: 'Trung tâm định hướng liên doanh với các đơn vị tổ chức thi chứng chỉ quốc tế để hỗ trợ học viên tốt nhất, đồng thời phát triển hệ thống quản lý học tập, website và ứng dụng hỗ trợ riêng.' },
      { label: 'Mô hình lớp học:', value: 'Duy trì mô hình lớp học nhỏ ưu việt từ 5–10 học viên nhằm đảm bảo sự tương tác tối đa và chất lượng chăm sóc đến từng cá nhân.' },
      { label: 'Cam kết chất lượng:', value: 'Cam kết đầu ra rõ ràng theo từng nhóm mục tiêu và cung cấp lộ trình tiếp nối từ học ngoại ngữ đến hỗ trợ hồ sơ du học/săn học bổng.' },
    ],
  },
];

export default function AboutUs() {
  return (
    <section id="ve-chung-toi" className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto container-px">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold">
            Về chúng tôi
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight text-balance">
            Huyway English — English to go far
          </h2>
          <p className="mt-4 text-ink-600 text-lg leading-relaxed">
            Khám phá câu chuyện về sự hình thành và phát triển của Huyway English, cùng với những giá trị cốt lõi
            mà chúng tôi mang đến cho hàng nghìn học viên.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section, index) => (
            /* Fade In — từng section card */
            <div
              key={section.title}
              data-anim="fade"
              className={`scroll-hidden bg-gradient-to-br from-ink-50 to-white rounded-3xl p-8 lg:p-10 ring-1 ring-ink-100 hover:shadow-xl transition-all ${index % 2 === 1 ? 'anim-delay-100' : ''}`}
            >
              <div className="flex items-start gap-4 mb-6">
                <span className="grid place-items-center w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-lg shadow-brand-500/30">
                  <section.icon className="w-7 h-7" />
                </span>
                <div>
                  <h3 className="text-2xl font-extrabold text-ink-900">{section.title}</h3>
                </div>
              </div>

              <div className="space-y-4 pl-2">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white rounded-xl p-5 ring-1 ring-ink-100">
                    <h4 className="font-bold text-brand-700 text-base mb-2">{item.label}</h4>
                    <p className="text-ink-600 leading-relaxed text-sm sm:text-base">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, label: '5-10 học viên/lớp', desc: 'Lớp học nhỏ chất lượng cao' },
            { icon: GraduationCap, label: 'IELTS 7.5+', desc: 'Trình độ giảng viên' },
            { icon: Calendar, label: '7/2026', desc: 'Bắt đầu triển khai' },
            { icon: Handshake, label: 'Cam kết đầu ra', desc: 'Không đạt — học lại miễn phí' },
          ].map((stat, i) => (
            /* Fly In từ phải — stat cards */
            <div
              key={i}
              data-anim="fly"
              className={`scroll-hidden text-center bg-gradient-to-b from-brand-50 to-white rounded-2xl p-6 ring-1 ring-brand-100 ${['', 'anim-delay-100', 'anim-delay-200', 'anim-delay-300'][i]}`}
            >
              <div className="mx-auto grid place-items-center w-12 h-12 rounded-xl bg-brand-600 text-white mb-3">
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-lg font-bold text-ink-900">{stat.label}</p>
              <p className="text-sm text-ink-600 mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
