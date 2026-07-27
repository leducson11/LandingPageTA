import { Star, Quote, BadgeCheck } from 'lucide-react';

const testimonials = [
  {
    name: 'Nguyễn Thu Hà',
    achievement: '5.5 → 7.5 IELTS',
    duration: '3 tháng',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'Mình từng tự học 6 tháng mà Writing vẫn 5.5. Lên Prep được giáo viên chữa từng câu, chỉ ra lỗi sai cụ thể. 3 tháng sau mình thi được 7.5, không tưởng tượng nổi!',
  },
  {
    name: 'Trần Quốc Bảo',
    achievement: '6.0 → 8.0 IELTS',
    duration: '4 tháng',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'Nền tảng AI chấm Speaking cực xịn. Mình luyện nói mỗi ngày, AI sửa phát âm và từ vựng ngay lập tức. Lên 8.0 Speaking mà không cần đến trung tâm.',
  },
  {
    name: 'Lê Phương Linh',
    achievement: 'Mất gốc → 6.5 IELTS',
    duration: '5 tháng',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'Mình mất gốc tiếng Anh, rất tự ti. Lộ trình Foundation của Prep giúp mình xây nền lại từ đầu. Giáo viên kèm 1-1 rất kiên nhẫn. Thi lần đầu đã 6.5!',
  },
  {
    name: 'Phạm Minh Đức',
    achievement: '6.5 → 7.5 IELTS',
    duration: '2 tháng',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'Đang đi làm nên chỉ học được buổi tối. Tính linh hoạt của Prep rất hợp. 2 tháng ôn luyện tập trung, mình thi đạt 7.5 đúng cam kết.',
  },
  {
    name: 'Vũ Thị Mai',
    achievement: '5.0 → 6.5 IELTS',
    duration: '4 tháng',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'Điều mình thích nhất là dashboard tiến độ, biết mình đang ở band nào, cần cải thiện gì. Không học mò như trước nữa. Cảm ơn Prep rất nhiều!',
  },
  {
    name: 'Hoàng Anh Tuấn',
    achievement: '6.0 → 7.0 IELTS',
    duration: '3 tháng',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'Thi trượt 2 lần rồi mới biết đến Prep. Giáo viên phân tích điểm yếu rất chuẩn, mình tập trung sửa đúng chỗ. Lần 3 thi được 7.0, tiết kiệm biết bao tiền.',
  },
];

const stats = [
  { value: '50.000+', label: 'Học viên theo học' },
  { value: '92%', label: 'Đạt mục tiêu band' },
  { value: '4.9/5', label: 'Đánh giá hài lòng' },
  { value: '7.5', label: 'Band điểm trung bình' },
];

const partners = ['Cambridge', 'British Council', 'IDP', 'Oxford', 'Macmillan', 'Hà Nội Uni'];

export default function Testimonials() {
  return (
    <section id="hoc-vien" className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto container-px">
        {/* stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center bg-gradient-to-b from-brand-50 to-white rounded-2xl p-6 ring-1 ring-brand-100">
              <p className="text-3xl lg:text-4xl font-extrabold gradient-text">{s.value}</p>
              <p className="mt-1.5 text-sm text-ink-600 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-100 text-accent-700 text-sm font-semibold">
            Chứng thực xã hội
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight text-balance">
            Học viên Prep nói gì?
          </h2>
          <p className="mt-4 text-ink-600 text-lg">
            Hàng nghìn học viên đã thay đổi quỹ đạo tiếng Anh cùng Prep. Dưới đây là một vài câu chuyện thật.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <figure key={t.name} className="bg-white rounded-2xl p-6 ring-1 ring-ink-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
              <Quote className="w-8 h-8 text-brand-200" />
              <blockquote className="mt-3 text-ink-700 text-[15px] leading-relaxed flex-1">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 pt-4 border-t border-ink-100">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-bold text-ink-900 text-sm flex items-center gap-1">
                    {t.name}
                    <BadgeCheck className="w-4 h-4 text-brand-500" />
                  </p>
                  <p className="text-xs text-ink-500">{t.duration} học tại Prep</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-success/10 text-success-700 text-xs font-bold">{t.achievement}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* partners */}
        <div className="mt-16">
          <p className="text-center text-sm font-semibold text-ink-400 uppercase tracking-wider">
            Đối tác & Khung chuẩn đào tạo
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {partners.map((p) => (
              <span key={p} className="text-lg font-extrabold text-ink-300 hover:text-ink-500 transition-colors tracking-tight">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
