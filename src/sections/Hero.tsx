import { PlayCircle, ShieldCheck, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 lg:pt-36 pb-16 lg:pb-24"
    >
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, #eef5ff 0%, #fff4e6 50%, #fff0fc 100%)' }}
        />
        <div
          className="absolute -top-24 -right-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-40"
          style={{ background: 'radial-gradient(circle, #448cfd44, transparent 70%)' }}
        />
        <div
          className="absolute top-40 -left-32 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #ff8de444, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #ff872033, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #448cfd 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto container-px">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* left */}
          <div className="animate-fade-up">
            <div className="mt-6 flex items-center gap-2">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-3 py-1.5 rounded-full border border-brand-100 shadow-sm">
                Huyway English • English to go far.
              </span>
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink-900 leading-[1.1] text-balance">
              Chinh phục <span className="gradient-text">IELTS & TOEIC</span>{" "}
              chỉ sau 90 ngày
            </h1>

            {/* Fade In — mô tả */}
            <p
              data-anim="fade"
              className="scroll-hidden mt-5 text-lg text-ink-600 leading-relaxed max-w-xl anim-delay-200"
            >
              Lộ trình học cá nhân hóa, giáo viên 8.0+ IELTS & 900+ TOEIC đồng
              hành 1-1, luyện tập trên nền tảng AI chấm chữa chi tiết. Cam kết
              đầu ra bằng văn bản — không đạt, học lại miễn phí.
            </p>

            {/* Bounce — CTA buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#dang-ky"
                data-anim="bounce"
                className="btn-g3 scroll-hidden cta-pulse group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold shadow-xl anim-delay-300"
              >
                Đăng ký học thử miễn phí
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#cac-khoa-hoc"
                data-anim="bounce"
                className="scroll-hidden inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-ink-800 font-semibold border border-ink-200 hover:border-brand-300 hover:text-brand-600 transition-all anim-delay-400"
              >
                <PlayCircle className="w-5 h-5" />
                Xem lộ trình học
              </a>
            </div>
          </div>

          {/* right - hero shot — Fly In từ phải */}
          <div className="relative scroll-hidden animate-fade-up [animation-delay:150ms]" data-anim="fly">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-900/20 ring-1 ring-black/5">
              <img
                src="https://images.pexels.com/photos/5212343/pexels-photo-5212343.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Học viên đang học tiếng Anh online"
                className="w-full h-[26rem] lg:h-[34rem] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />

              {/* play button */}
              <button
                className="absolute inset-0 grid place-items-center group"
                aria-label="Xem video giới thiệu"
              >
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
                  <p className="text-sm font-bold text-ink-900">
                    Cam kết đầu ra
                  </p>
                  <p className="text-xs text-ink-500">
                    Không đạt — học lại free
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-2 lg:-right-6 bg-white rounded-2xl shadow-xl ring-1 ring-ink-100 p-4 w-52 animate-float-slow [animation-delay:1.5s]">
              <p className="text-xs text-ink-500 font-medium">
                Điểm trung bình
              </p>
              <p className="text-2xl font-extrabold text-ink-900 mt-0.5">
                IELTS 7.5{" "}
                <span className="text-sm font-semibold text-success-600">
                  +1.5
                </span>
              </p>
              <p className="text-sm font-bold text-ink-900 mt-1">
                TOEIC 850+{" "}
                <span className="text-xs font-semibold text-success-600">
                  +150
                </span>
              </p>
              <div className="mt-2 h-1.5 rounded-full bg-ink-100 overflow-hidden">
                <div
                  className="h-full w-[85%] rounded-full"
                  style={{ background: 'linear-gradient(90deg, #448cfd, #ff8720, #ff8de4)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


