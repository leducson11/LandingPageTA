import { Star, PlayCircle, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 lg:pt-36 pb-16 lg:pb-24">
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white" />
        <div className="absolute -top-24 -right-24 w-[36rem] h-[36rem] rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute top-40 -left-32 w-[30rem] h-[30rem] rounded-full bg-accent-100/50 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #1d57f5 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto container-px">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* left */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-200 shadow-sm">
              <span className="flex -space-x-1">
                {[0, 1, 2].map((i) => (
                  <img
                    key={i}
                    src={`https://images.pexels.com/photos/${[1239291, 415829, 762020][i]}/pexels-photo-${[1239291, 415829, 762020][i]}.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop`}
                    alt="học viên"
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    loading="eager"
                  />
                ))}
              </span>
              <span className="text-xs font-semibold text-ink-700">
                +50.000 học viên tin chọn
              </span>
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink-900 leading-[1.1] text-balance">
              Chinh phục <span className="gradient-text">IELTS & TOEIC</span> chỉ sau 90 ngày
            </h1>

            <p className="mt-5 text-lg text-ink-600 leading-relaxed max-w-xl">
              Lộ trình học cá nhân hóa, giáo viên 8.0+ IELTS & 900+ TOEIC đồng hành 1-1, luyện tập trên
              nền tảng AI chấm chữa chi tiết. Cam kết đầu ra bằng văn bản — không đạt, học lại miễn phí.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#dang-ky"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-brand-600 text-white font-semibold shadow-xl shadow-brand-500/30 hover:bg-brand-700 hover:-translate-y-0.5 transition-all"
              >
                Đăng ký học thử miễn phí
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#noi-dung"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-ink-800 font-semibold border border-ink-200 hover:border-brand-300 hover:text-brand-700 transition-all"
              >
                <PlayCircle className="w-5 h-5" />
                Xem lộ trình học
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Stat icon={<Users className="w-5 h-5" />} value="50.000+" label="Học viên" />
              <Stat icon={<Star className="w-5 h-5" />} value="4.9/5" label="Đánh giá" />
              <Stat icon={<ShieldCheck className="w-5 h-5" />} value="92%" label="Đạt mục tiêu" />
            </div>
          </div>

          {/* right - hero shot */}
          <div className="relative animate-fade-up [animation-delay:150ms]">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-900/20 ring-1 ring-black/5">
              <img
                src="https://images.pexels.com/photos/5212343/pexels-photo-5212343.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Học viên đang học tiếng Anh online"
                className="w-full h-[26rem] lg:h-[34rem] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />

              {/* play button */}
              <button className="absolute inset-0 grid place-items-center group" aria-label="Xem video giới thiệu">
                <span className="relative">
                  <span className="absolute inset-0 rounded-full bg-white/40 animate-pulse-ring" />
                  <span className="relative grid place-items-center w-16 h-16 rounded-full bg-white/90 backdrop-blur shadow-xl group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-9 h-9 text-brand-600" />
                  </span>
                </span>
              </button>
            </div>

            {/* floating card */}
            <div className="absolute -bottom-5 -left-3 lg:-left-8 bg-white rounded-2xl shadow-xl ring-1 ring-ink-100 p-4 w-56 animate-float-slow">
              <div className="flex items-center gap-3">
                <div className="grid place-items-center w-11 h-11 rounded-xl bg-success/10 text-success-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink-900">Cam kết đầu ra</p>
                  <p className="text-xs text-ink-500">Không đạt — học lại free</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-2 lg:-right-6 bg-white rounded-2xl shadow-xl ring-1 ring-ink-100 p-4 w-52 animate-float-slow [animation-delay:1.5s]">
              <p className="text-xs text-ink-500 font-medium">Điểm trung bình</p>
              <p className="text-2xl font-extrabold text-ink-900 mt-0.5">IELTS 7.5 <span className="text-sm font-semibold text-success-600">+1.5</span></p>
              <p className="text-sm font-bold text-ink-900 mt-1">TOEIC 850+ <span className="text-xs font-semibold text-success-600">+150</span></p>
              <div className="mt-2 h-1.5 rounded-full bg-ink-100 overflow-hidden">
                <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-brand-500 to-brand-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid place-items-center w-9 h-9 rounded-lg bg-brand-50 text-brand-600">{icon}</span>
      <div>
        <p className="text-lg font-extrabold text-ink-900 leading-none">{value}</p>
        <p className="text-xs text-ink-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
