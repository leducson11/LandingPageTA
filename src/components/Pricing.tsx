import { useEffect, useState } from 'react';
import { Check, Crown, Gift, Zap, Clock, Flame } from 'lucide-react';

const plans = [
  {
    name: 'Cơ bản',
    tagline: 'Khởi đầu vững chắc',
    icon: Zap,
    color: 'from-teal-500 to-teal-400',
    price: '2.990.000',
    oldPrice: '4.990.000',
    period: '/ khóa',
    features: [
      'Lộ trình Foundation + Skill Building',
      '200+ video bài giảng',
      'Luyện tập AI Listening & Reading',
      'Thi thử 3 lần',
      'Hỗ trợ qua group học viên',
    ],
    popular: false,
  },
  {
    name: 'Nâng cao',
    tagline: 'Phổ biến nhất',
    icon: Crown,
    color: 'from-brand-600 to-brand-400',
    price: '5.990.000',
    oldPrice: '9.990.000',
    period: '/ khóa',
    features: [
      'Toàn bộ 4 giai đoạn (Foundation → Mock Test)',
      '500+ video bài giảng + 20+ bộ đề Cambridge',
      'AI chấm chữa Writing & Speaking không giới hạn',
      'Giáo viên kèm 1-1, chữa bài 2 buổi/tuần',
      'Thi thử 10 lần + chấm chữa chi tiết',
      'Cam kết đầu ra bằng văn bản',
    ],
    popular: true,
  },
  {
    name: 'Combo 1-1',
    tagline: 'Cá nhân hóa tối đa',
    icon: Flame,
    color: 'from-accent-500 to-accent-400',
    price: '12.990.000',
    oldPrice: '19.990.000',
    period: '/ khóa',
    features: [
      'Tất cả quyền lợi gói Nâng cao',
      'Giáo viên riêng kèm 1-1, 3 buổi/tuần',
      'Lộ trình thiết kế riêng theo mục tiêu',
      'Chữa Writing/Speaking từng ngày',
      'Tư vấn tâm lý & chiến lược thi',
      'Cam kết đầu ra — hoàn 100% nếu không đạt',
    ],
    popular: false,
  },
];

const bonuses = [
  'Tài liệu 1000+ từ vựng IELTS theo chủ đề',
  'Bộ đề预测 2025 (dự đoán đề thi)',
  'E-book "Self-study IELTS" bản quyền',
  'Group Zoom chữa đề cùng giáo viên 8.5 IELTS',
];

function useCountdown(targetMs: number) {
  const [remaining, setRemaining] = useState(targetMs - Date.now());
  useEffect(() => {
    const id = setInterval(() => setRemaining(targetMs - Date.now()), 1000);
    return () => clearInterval(id);
  }, [targetMs]);
  const clamp = Math.max(0, remaining);
  const days = Math.floor(clamp / 86400000);
  const hours = Math.floor((clamp % 86400000) / 3600000);
  const mins = Math.floor((clamp % 3600000) / 60000);
  const secs = Math.floor((clamp % 60000) / 1000);
  return { days, hours, mins, secs };
}

export default function Pricing() {
  // countdown to 3 days from now (stable across renders)
  const [target] = useState(() => Date.now() + 1000 * 60 * 60 * 72);
  const { days, hours, mins, secs } = useCountdown(target);

  return (
    <section id="bang-gia" className="relative py-20 lg:py-28 bg-ink-50 overflow-hidden">
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] rounded-full bg-brand-100/40 blur-3xl -z-0" />
      <div className="max-w-7xl mx-auto container-px relative">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-100 text-accent-700 text-sm font-semibold">
            <Gift className="w-4 h-4" />
            Bảng giá & Ưu đãi
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight text-balance">
            Chọn gói học phù hợp với bạn
          </h2>
          <p className="mt-4 text-ink-600 text-lg">
            Giá ưu đãi chỉ áp dụng trong đợt tuyển sinh tháng này. Giảm tới 40% kèm quà tặng trị giá 3 triệu.
          </p>
        </div>

        {/* countdown */}
        <div className="mt-8 flex flex-col items-center">
          <p className="text-sm font-semibold text-accent-700 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Ưu đãi kết thúc sau
          </p>
          <div className="mt-3 flex items-center gap-2 sm:gap-3">
            {[
              { v: days, l: 'Ngày' },
              { v: hours, l: 'Giờ' },
              { v: mins, l: 'Phút' },
              { v: secs, l: 'Giây' },
            ].map((u, i) => (
              <div key={u.l} className="flex items-center gap-2 sm:gap-3">
                <div className="text-center">
                  <div className="grid place-items-center w-14 h-16 sm:w-16 sm:h-20 rounded-xl bg-ink-900 text-white text-2xl sm:text-3xl font-extrabold tabular-nums">
                    {String(u.v).padStart(2, '0')}
                  </div>
                  <p className="mt-1.5 text-xs font-medium text-ink-500">{u.l}</p>
                </div>
                {i < 3 && <span className="text-xl font-bold text-ink-300 -mt-5">:</span>}
              </div>
            ))}
          </div>
        </div>

        {/* plans */}
        <div className="mt-14 grid lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative bg-white rounded-[20px] p-7 lg:p-8 ring-1 transition-all flex flex-col ${
                p.popular
                  ? 'ring-brand-300 shadow-2xl shadow-brand-500/20 lg:-translate-y-3 scale-[1.02]'
                  : 'ring-ink-100 hover:ring-brand-200 hover:shadow-lg'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-600 text-white text-xs font-bold shadow-lg">
                  Phổ biến nhất
                </span>
              )}
              <div className="flex items-center gap-3">
                <span className={`grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} text-white shadow-md`}>
                  <p.icon className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-ink-900">{p.name}</h3>
                  <p className="text-sm text-ink-500">{p.tagline}</p>
                </div>
              </div>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-3xl font-extrabold text-ink-900">{p.price}</span>
                <span className="text-sm text-ink-500 mb-1">đ{p.period}</span>
              </div>
              <p className="mt-1 text-sm text-ink-400">
                <span className="line-through">{p.oldPrice}đ</span>
                <span className="ml-2 text-accent-600 font-bold">-40%</span>
              </p>

              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <span className={`grid place-items-center w-5 h-5 rounded-full ${p.popular ? 'bg-brand-100 text-brand-600' : 'bg-success/10 text-success-600'} shrink-0 mt-0.5`}>
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#dang-ky"
                className={`mt-7 inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold transition-all ${
                  p.popular
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700 hover:-translate-y-0.5'
                    : 'bg-ink-50 text-ink-800 hover:bg-brand-50 hover:text-brand-700'
                }`}
              >
                Đăng ký ngay
              </a>
            </div>
          ))}
        </div>

        {/* bonuses */}
        <div className="mt-10 rounded-[20px] bg-gradient-to-r from-brand-600 to-brand-500 p-7 lg:p-9 text-white shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="lg:w-1/3">
              <h3 className="text-2xl font-extrabold flex items-center gap-2">
                <Gift className="w-7 h-7" /> Quà tặng độc quyền
              </h3>
              <p className="mt-2 text-brand-100 text-sm">Tri giá 3.000.000đ — tặng kèm khi đăng ký trong đợt ưu đãi</p>
            </div>
            <ul className="lg:w-2/3 grid sm:grid-cols-2 gap-3">
              {bonuses.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-white/95">
                  <Check className="w-5 h-5 text-accent-300 shrink-0 mt-0.5" strokeWidth={3} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
