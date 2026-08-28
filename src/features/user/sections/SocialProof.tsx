import { ShieldCheck, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

const counters = [
  {
    value: "95%",
    label: "Học viên đạt mục tiêu đầu ra ngay từ lần thi đầu tiên",
    icon: TrendingUp,
  },
  {
    value: "+1.5 Điểm",
    label: "Số điểm tăng trung bình sau khi hoàn thành khóa học IELTS",
    icon: TrendingUp,
  },
  {
    value: "10,000+",
    label: "Học viên đã đạt band 7.5+ IELTS và 850+ TOEIC tại Huyway English",
    icon: Users,
  },
];

const commitmentConditions = [
  "Đi học đủ số buổi theo lộ trình đã được giáo viên và học viên thống nhất từ đầu khóa.",
  "Hoàn thành đủ bài tập về nhà được giao theo từng tuần với tỷ lệ hoàn thành tối thiểu 80%.",
  "Tham gia đủ các bài kiểm tra giữa kỳ và cuối kỳ theo lịch học.",
  "Nộp đơn đăng ký cam kết đầu ra trong vòng 7 ngày đầu tiên của khóa học.",
];

export default function SocialProof() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="social-proof" className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto container-px">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span
            data-anim="fade"
            className="scroll-hidden inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold"
          >
            Kết quả thực tế
          </span>
          <h2
            data-anim="fade"
            className="scroll-hidden mt-5 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight text-balance anim-delay-150"
          >
            Con số khẳng định chất lượng
          </h2>
          <p
            data-anim="fade"
            className="scroll-hidden mt-4 text-ink-600 text-lg leading-relaxed anim-delay-200"
          >
            Hàng nghìn học viên đã tin tưởng và đạt được mục tiêu tiếng Anh cùng Huyway English.
          </p>
        </div>

        {/* Counters Grid */}
        <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
          {counters.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                data-anim="fade"
                className="scroll-hidden text-center p-8 rounded-3xl bg-gradient-to-b from-white to-brand-50/50 ring-1 ring-brand-100 hover:shadow-xl hover:-translate-y-1 transition-all"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <span className="grid place-items-center w-14 h-14 rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-500/30">
                    <Icon className="w-7 h-7" />
                  </span>
                </div>
                <p className="text-4xl sm:text-5xl font-extrabold text-brand-700 tracking-tight">
                  {item.value}
                </p>
                <p className="mt-3 text-ink-600 text-sm leading-relaxed">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Commitment Card */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-10 text-white shadow-2xl shadow-brand-500/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="grid place-items-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm shrink-0">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-extrabold leading-tight">
                  Cam kết đầu ra bằng văn bản
                </h3>
                <p className="mt-2 text-white/90 text-base leading-relaxed">
                  Hoàn 100% học phí hoặc học lại miễn phí nếu không đạt mục tiêu
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline underline-offset-4 decoration-2 hover:decoration-white/60 transition-colors"
                >
                  Xem chi tiết điều kiện áp dụng cam kết tại đây
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commitment Details Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-ink-900">
                  Điều kiện áp dụng cam kết đầu ra
                </h3>
              </div>
              <ul className="space-y-4">
                {commitmentConditions.map((condition, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="grid place-items-center w-6 h-6 rounded-full bg-brand-50 text-brand-600 text-xs font-bold shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-ink-700 text-sm leading-relaxed">{condition}</p>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-8 w-full py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
