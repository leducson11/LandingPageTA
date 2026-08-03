import { Target, Sparkles, HeartHandshake, LineChart, Repeat, Headphones } from 'lucide-react';

const benefits = [
  {
    icon: Target,
    title: 'Lộ trình cá nhân hóa',
    desc: 'Khảo sát đầu vào, thiết kế lộ trình riêng theo band điểm hiện tại và mục tiêu của bạn — không học dư, không học thiếu.',
  },
  {
    icon: HeartHandshake,
    title: 'Giáo viên đồng hành 1-1',
    desc: 'Giáo viên 8.0+ IELTS trực tiếp chữa bài, phản hồi chi tiết từng lỗi sai và kèm cặp bạn suốt quá trình học.',
  },
  {
    icon: Sparkles,
    title: 'AI chấm chữa tức thì',
    desc: 'Nộp bài Writing/Speaking là có điểm số và gợi ý sửa lỗi trong vài giây, luyện tập không giới hạn lần.',
  },
  {
    icon: LineChart,
    title: 'Theo dõi tiến độ minh bạch',
    desc: 'Dashboard trực quan cho bạn biết mình đang ở đâu, còn bao xa đến mục tiêu và cần cải thiện kỹ năng nào.',
  },
  {
    icon: Repeat,
    title: 'Học lại miễn phí nếu không đạt',
    desc: 'Cam kết đầu ra bằng văn bản. Hoàn thành đủ điều kiện mà chưa đạt band cam kết — được học lại miễn phí.',
  },
  {
    icon: Headphones,
    title: 'Linh hoạt học mọi lúc mọi nơi',
    desc: 'Học trên web hoặc app, tùy chọn giờ học. Tải bài về điện thoại để học cả khi không có mạng.',
  },
];

export default function ValueProposition() {
  return (
    <section id="loi-ich" className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto container-px">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold">
              Giải pháp & Lợi ích
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight text-balance">
              Huyway English — giải pháp toàn diện cho mọi nỗi đau
            </h2>
            <p className="mt-4 text-ink-600 text-lg leading-relaxed">
              Không chỉ là kho video bài giảng. Huyway English là hệ sinh thái học IELTS kết hợp con người và AI,
              giúp bạn đi thẳng từ vị trí hiện tại đến band điểm mục tiêu trong thời gian ngắn nhất.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-3.5">
                  <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-lg shadow-brand-500/30">
                    <b.icon className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-ink-900 text-[15px]">{b.title}</h3>
                    <p className="mt-1 text-sm text-ink-600 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <img
                src="https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Giáo viên kèm học viên 1-1"
                className="w-full h-[30rem] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 lg:right-6 bg-white rounded-2xl shadow-xl ring-1 ring-ink-100 p-5 max-w-xs">
              <p className="text-sm font-semibold text-ink-900">Học viên Nguyễn Thu Hà</p>
              <p className="text-xs text-ink-500 mt-0.5">Từ 5.5 lên 7.5 sau 3 tháng</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="w-7 h-7 rounded-full bg-brand-100 border-2 border-white grid place-items-center text-[10px] font-bold text-brand-700">
                      {['5.5', '6.0', '6.5', '7.5'][i]}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-success-600">+2.0 band</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
