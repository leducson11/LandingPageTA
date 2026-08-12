import { useState } from "react";
import { Zap, BookOpen, GraduationCap, Clock, BadgeCheck } from "lucide-react";

const coursePackages = [
  {
    title: "GÓI A – CẤP TỐC (SPRINT)",
    subTitle: "Cấp tốc 3 tháng",
    descriptionParagraph:
      "Tập trung vào chứng chỉ TOEIC 2 kỹ năng hoặc 4 kỹ năng dành cho những người cần chứng chỉ gấp và đã có nền tảng. Lộ trình rút gọn, bài vở chọn lọc, luyện thi tập trung vào điểm yếu cốt lõi để đạt mục tiêu nhanh nhất.",
    price: "2.990.000đ",
    availableSlots: 8,
    roadmapImage: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1000",
    icon: Zap,
    isPopular: false,
    benefits: [
      "Lộ trình rút gọn 3 tháng, tập trung vào mục tiêu",
      "Giáo viên 8.0+ IELTS chữa bài chi tiết từng câu",
      "AI chấm chữa Writing & Speaking không giới hạn",
      "Tặng bộ tài liệu độc quyền luyện thi cấp tốc",
      "Hỗ trợ đặt lịch linh hoạt mọi lúc mọi nơi",
    ],
  },
  {
    title: "GÓI B – LỘ TRÌNH CHUẨN",
    subTitle: "Lộ trình chuẩn 3-6 tháng",
    descriptionParagraph:
      "Đào tạo TOEIC hoặc IELTS, giúp học viên củng cố nền tảng và luyện thi hệ thống. Phù hợp với người có thời gian luyện tập vừa phải nhưng muốn đảm bảo đầu ra ổn định.",
    price: "5.990.000đ",
    availableSlots: 12,
    roadmapImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1000",
    icon: BookOpen,
    isPopular: true,
    benefits: [
      "Cam kết đầu ra bằng văn bản hoàn 100% nếu không đạt",
      "Giáo viên 8.0+ đồng hành 1-1, chữa bài 2 buổi/tuần",
      "AI chấm chữa 24/7 và phản hồi tức thì",
      "500+ video bài giảng + 20+ bộ đề Cambridge",
      "Tặng bộ tài liệu độc quyền + quà trị giá 3 triệu",
    ],
  },
  {
    title: "GÓI C – DÀI HẠN TOÀN DIỆN",
    subTitle: "Dài hạn toàn diện 6-12 tháng",
    descriptionParagraph:
      "Kết hợp giữa luyện thi chứng chỉ (TOEIC/IELTS) và tiếng Anh giao tiếp dành cho người muốn phát triển năng lực ngôn ngữ bền vững. Xây nền vững chắc, mở rộng cơ hội học tập và nghề nghiệp.",
    price: "12.990.000đ",
    availableSlots: 6,
    roadmapImage: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=1000",
    icon: GraduationCap,
    isPopular: false,
    benefits: [
      "Lộ trình cá nhân hóa theo mục tiêu cá nhân",
      "Giáo viên riêng kèm 1-1, 3 buổi/tuần",
      "Chữa Writing/Speaking từng ngày với AI + giáo viên",
      "Tư vấn tâm lý & chiến lược thi chuyên sâu",
      "Hỗ trợ du học: visa, học bổng, hồ sơ",
    ],
  },
];

export default function Courses() {
  const [activeIndex, setActiveIndex] = useState(1);
  const active = coursePackages[activeIndex];

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

        <div className="mb-12">
          <div className="flex items-center justify-around gap-4 sm:gap-6 pt-10 pb-4 scrollbar-hide">
            {coursePackages.map((pkg, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={index} className="flex items-center gap-4 sm:gap-6">
                  <button
                    onClick={() => setActiveIndex(index)}
                    className={`relative flex flex-col items-center gap-2 min-w-[90px] sm:min-w-[110px] rounded-2xl transition-all duration-300 overflow-visible pt-6 ${
                      isActive ? "scale-105" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    {pkg.isPopular && (
                      <span className="absolute top-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-pink-500 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-md z-10">
                        Phổ biến nhất
                      </span>
                    )}
                    <div
                      className={`w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-lg shadow-brand-500/30"
                          : "bg-white text-ink-500 ring-2 ring-ink-200"
                      }`}
                    >
                      <pkg.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div className="text-center">
                      <p
                        className={`text-xs sm:text-sm font-extrabold transition-colors ${
                          isActive ? "text-brand-700" : "text-ink-700"
                        }`}
                      >
                        {pkg.title.split("–")[0].trim()}
                      </p>
                      <p className="text-[10px] sm:text-xs text-ink-500 mt-0.5">{pkg.subTitle}</p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-3xl lg:text-4xl font-black text-ink-900 tracking-tight uppercase">
                {active.title}
              </h3>
              <p className="text-2xl sm:text-3xl font-black text-amber-500 mt-2">{active.price}</p>
              <p className="mt-3 text-ink-600 leading-relaxed">{active.descriptionParagraph}</p>
            </div>

            <ul className="space-y-3">
              {active.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="grid place-items-center w-6 h-6 shrink-0 rounded-full bg-emerald-50 text-emerald-600 mt-0.5">
                    <BadgeCheck className="w-4 h-4" />
                  </span>
                  <span className="text-sm text-ink-700 leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 text-rose-600">
              <span className="text-sm font-semibold">Số chỗ trống còn lại:</span>
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-100 text-rose-700 text-sm font-bold">
                {active.availableSlots}
              </span>
            </div>

            <a
              href="#dang-ky"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-brand-600 text-white font-extrabold text-lg shadow-xl shadow-brand-500/30 hover:bg-brand-700 transition-colors uppercase tracking-wide"
            >
              Đăng ký ngay
            </a>
          </div>

          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 bg-ink-50">
            <img
              src={active.roadmapImage}
              alt={`Lộ trình ${active.title}`}
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
