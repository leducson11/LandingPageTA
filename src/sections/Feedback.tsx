import { Users, Brain, Music, Heart, Star, MessageCircle } from 'lucide-react';

const feedbackItems = [
  {
    icon: Users,
    title: 'Giải quyết vấn đề sĩ số',
    description: 'Học viên cảm thấy được quan tâm sát sao hơn so với các lớp đông 20-30 người ở những trung tâm lớn.',
    color: 'from-blue-500 to-blue-400',
  },
  {
    icon: Brain,
    title: 'Thay đổi tư duy học tập',
    description: 'Phản hồi về việc không còn sợ nói, không còn học vẹt ngữ pháp mà có thể "học để dùng" trong môi trường thực tế.',
    color: 'from-purple-500 to-purple-400',
  },
  {
    icon: Music,
    title: 'Hiệu quả từ phương pháp âm nhạc',
    description: 'Những chia sẻ về việc ghi nhớ từ vựng dễ dàng và tự nhiên hơn thông qua các giai điệu yêu thích.',
    color: 'from-pink-500 to-pink-400',
  },
  {
    icon: Heart,
    title: 'Sự hài lòng về giảng viên',
    description: 'Đánh giá về sự tâm huyết, khả năng sư phạm và cách giáo viên hướng dẫn học viên tự "câu cá" (tự nghiên cứu) tại nhà.',
    color: 'from-red-500 to-red-400',
  },
];

const testimonials = [
  {
    name: 'Nguyễn Thị Lan',
    role: 'Học viên Gói B',
    text: 'Trước đây mình học ở lớp 25 người, giáo viên không thể quan tâm từng người. Lên Huyway English chỉ có 8 học viên, mình được sửa lỗi từng câu và tiến bộ nhanh hơn hẳn.',
    rating: 5,
  },
  {
    name: 'Trần Minh Hoàng',
    role: 'Học viên Gói C',
    text: 'Phương pháp học qua âm nhạc thật sự hiệu quả. Mình học từ vựng qua bài hát, nhớ lâu hơn và không còn sợ Speaking nữa. Giờ mình tự tin giao tiếp hơn nhiều.',
    rating: 5,
  },
  {
    name: 'Lê Phương Mai',
    role: 'Học viên Gói A',
    text: 'Giáo viên không chỉ dạy kiến thức mà còn hướng dẫn cách tự học. Mình biết cách nghiên cứu bài ở nhà, không còn phụ thuộc hoàn toàn vào lớp học.',
    rating: 5,
  },
];

const cardDelays = ['', 'anim-delay-100', 'anim-delay-200', 'anim-delay-300'];
const testDelays = ['', 'anim-delay-200', 'anim-delay-400'];

export default function Feedback() {
  return (
    <section id="feedback" className="relative py-20 lg:py-28 bg-gradient-to-b from-ink-50 to-white">
      <div className="max-w-7xl mx-auto container-px">

        {/* Fade In — header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold">
            Feedback học viên
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight text-balance">
            Học viên nói gì về Huyway English?
          </h2>
          <p
            data-anim="fade"
            className="scroll-hidden mt-4 text-ink-600 text-lg leading-relaxed anim-delay-150"
          >
            Dựa trên kết quả khảo sát nhu cầu và giải quyết các "nỗi đau" mà học viên thường gặp phải ở những nơi khác.
            Đây là cam kết chất lượng của trung tâm.
          </p>
        </div>

        {/* Fade In stagger — highlight cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {feedbackItems.map((item, index) => (
            <div
              key={item.title}
              data-anim="fade"
              className={`scroll-hidden bg-white rounded-2xl p-6 ring-1 ring-ink-100 hover:shadow-xl hover:-translate-y-1 transition-all ${cardDelays[index]}`}
            >
              <span className={`grid place-items-center w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg mb-4`}>
                <item.icon className="w-7 h-7" />
              </span>
              <h3 className="font-bold text-ink-900 text-base mb-2">{item.title}</h3>
              <p className="text-ink-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
              Chia sẻ từ học viên
            </h3>
            <p
              data-anim="fade"
              className="scroll-hidden mt-4 text-ink-600 text-lg anim-delay-150"
            >
              Những câu chuyện thật về sự thay đổi tư duy và phương pháp học tập
            </p>
          </div>

          {/* Fly In từ phải — testimonial cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                data-anim="fly"
                className={`scroll-hidden bg-white rounded-2xl p-6 ring-1 ring-ink-100 hover:shadow-lg transition-all ${testDelays[index]}`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-ink-700 text-sm leading-relaxed mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-ink-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-600 to-brand-400 text-white grid place-items-center font-bold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-ink-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-ink-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note — Fade In */}
        <div
          data-anim="fade"
          className="scroll-hidden mt-12 bg-amber-50 rounded-2xl p-6 ring-1 ring-amber-200 anim-delay-200"
        >
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-amber-900 font-semibold mb-1">Lưu ý quan trọng</p>
              <p className="text-sm text-amber-800 leading-relaxed">
                Vì trung tâm đang trong giai đoạn phát triển, các feedback này hiện tại được xây dựng dựa trên kết quả khảo sát nhu cầu và các lỗi sai của thị trường hiện nay để định hình cam kết chất lượng của trung tâm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
