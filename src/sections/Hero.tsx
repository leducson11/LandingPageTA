import { PlayCircle, ArrowRight, Target, GraduationCap } from "lucide-react";
import thayHuyImg from "../assets/ThayHuy1-removebg.png";

const heroBenefits = [
  {
    icon: Target,
    title: "Lộ trình cá nhân hóa",
    desc: "Học đúng năng lực, tối ưu thời gian",
  },
  {
    icon: GraduationCap,
    title: "Giáo viên 8.0+ đồng hành 1-1",
    desc: "Tương tác, sửa lỗi trực tiếp",
  },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 lg:pt-36 pb-16 lg:pb-24"
      style={{ aspectRatio: "16/9", minHeight: "600px" }}
    >
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f5f3ff 55%, #ede9fe 100%)' }}
        />
        <div
          className="absolute -top-24 -right-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.20), transparent 70%)' }}
        />
        <div
          className="absolute top-40 -left-32 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.20), transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(54,93,255,0.16), transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #6d28d9 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Left half - white with diagonal stripes */}
      <div className="absolute inset-0 bg-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #6d28d9 0px, #6d28d9 1px, transparent 1px, transparent 24px)",
            opacity: 0.04,
          }}
        />
      </div>

      {/* Right half - brand color with diagonal clip */}
      <div
        className="absolute inset-0 bg-brand-600"
        style={{
          clipPath: "polygon(70% 0%, 100% 0%, 100% 100%, 50% 100%)",
        }}
      />

      {/* Portrait image on right side - separate from background */}
      <div
        className="absolute right-0 bottom-0"
        style={{ width: "50%", height: "90%" }}
      >
        <img
          src={thayHuyImg}
          alt="Thay Huy"
          className="h-full w-full object-contain object-bottom"
        />
      </div>

      {/* Content on left side */}
      <div className="relative z-10 max-w-7xl mx-auto container-px h-full flex items-center">
        <div className="max-w-xl animate-fade-up">
          <div className="mt-6 flex items-center gap-2">
            <span className="pill-label text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
              Huyway English • English to go far.
            </span>
          </div>

          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink-900 leading-[1.1] text-balance">
            Chinh phục <span className="gradient-text">IELTS & TOEIC</span>{" "}
            chỉ sau 90 ngày
          </h1>

          {/* 2-column benefit grid — Desktop */}
          <div className="mt-6 grid sm:grid-cols-2 gap-4 lg:gap-5">
            {heroBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/70 ring-1 ring-ink-100 hover:ring-brand-200 hover:shadow-md transition-all"
                >
                  <span className="grid place-items-center w-10 h-10 shrink-0 rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-ink-900 leading-snug">
                      {benefit.title}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-600 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bounce — CTA buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#dang-ky"
              data-anim="bounce"
              className="btn-g3 scroll-hidden cta-pulse group inline-flex items-center justify-center gap-2 px-7 py-4 font-semibold anim-delay-300"
            >
              Đăng ký học thử miễn phí
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#cac-khoa-hoc"
              data-anim="bounce"
              className="btn-outline-violet scroll-hidden inline-flex items-center justify-center gap-2 px-7 py-4 font-semibold transition-all anim-delay-400"
            >
              <PlayCircle className="w-5 h-5" />
              Xem lộ trình học
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
